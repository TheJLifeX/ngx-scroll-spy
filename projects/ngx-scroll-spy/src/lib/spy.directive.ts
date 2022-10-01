import { isPlatformServer } from '@angular/common';
import { Directive, Input, OnInit, OnDestroy, HostBinding, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { filter, Subject, takeUntil } from 'rxjs';
import { ScrollSpyService } from './scroll-spy.service';

/**
 * Spies on the spyTarget that has the provided `spyTargetId`.
 */
@Directive({
  selector: '[spy]',
  standalone: true
})
export class SpyDirective implements OnInit, OnDestroy {

  /**
   * ID of the spyTarget to spy.
   */
  @Input() spyTargetId!: string;

  /**
   * @optional
   *
   * ID of the spyTargetContainer containing the spyTarget.
   */
  @Input() spyTargetContainerId?: string;

  /**
   * Class name to add to this element when the spyTarget has transitioned into a state of intersection (is visisble).
   *
   * @default
   * 'active'
   */
  @Input() spyActiveClass: string = 'active';

  @HostBinding('class') activeClassInDOM?: string;

  private directiveDestroyed$ = new Subject<void>();

  constructor(
    private scrollSpyService: ScrollSpyService,
    @Inject(PLATFORM_ID) private platformId: string,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }
    if (!this.spyTargetId) {
      throw new Error('SpyDirective: spyTargetId needs to be set.');
    }
    this.scrollSpyService.getSpyTargetIsIntersecting$(this.spyTargetContainerId)
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
