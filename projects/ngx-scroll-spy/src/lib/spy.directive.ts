import { isPlatformServer } from '@angular/common';
import { Directive, Input, OnInit, OnDestroy, HostBinding, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { filter, Subject, takeUntil } from 'rxjs';
import { ScrollSpyService } from './scroll-spy.service';

/**
 * Scroll spy.
 */
@Directive({
  selector: '[spy]',
  standalone: true
})
export class SpyDirective implements OnInit, OnDestroy {

  @Input() spyTargetId!: string;
  @Input() spyTargetContainerId?: string;
  @Input() spyActiveClass: string = 'active';

  @HostBinding('class') activeClassInDOM?: string;

  private directiveDestroyed$ = new Subject<void>();

  constructor(
    private scrollSpyService: ScrollSpyService,
    @Inject(PLATFORM_ID) private platformId: string,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (!this.spyTargetId) {
      throw new Error('SpyDirective: spyTargetId needs to be set.');
    }
    if (isPlatformServer(this.platformId)) {
      return;
    }
    this.scrollSpyService.getActiveSpyTargetChanged$(this.spyTargetContainerId)
      .pipe(
        takeUntil(this.directiveDestroyed$),
        filter((event) =>
          event.spyTarget.id === this.spyTargetId
          && event.spyTarget.containerId === this.spyTargetContainerId
        )
      )
      .subscribe((event) => {
        this.activeClassInDOM = event.isIntersecting ? this.spyActiveClass : undefined;
        /**
         * Manually trigger change detection to update activeClass in the DOM
         * (Needed for the case changeDetection OnPush is used).
         */
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.directiveDestroyed$.next();
    this.directiveDestroyed$.complete();
  }
}
