import { isPlatformServer } from '@angular/common';
import { Directive, Input, OnInit, OnDestroy, Inject, PLATFORM_ID, ElementRef } from '@angular/core';
import { ScrollSpyService } from './scroll-spy.service';

/**
 * Scroll target scroll container for scroll spy.
 */
@Directive({
  selector: '[spyTargetContainer]',
  standalone: true
})
export class SpyTargetContainerDirective implements OnInit, OnDestroy {

  @Input() spyTargetContainerId!: string;

  constructor(
    private scrollSpyService: ScrollSpyService,
    @Inject(PLATFORM_ID) private platformId: string,
    private elementRef: ElementRef<Element>,
  ) { }

  ngOnInit(): void {
    if (!this.spyTargetContainerId) {
      throw new Error('SpyTargetContainerDirective: spyTargetContainerId needs to be set.');
    }
    if (isPlatformServer(this.platformId)) {
      return;
    }
    this.scrollSpyService.createScrollSpy(this.spyTargetContainerId, this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }
    this.scrollSpyService.destroyScrollSpy(this.spyTargetContainerId);
  }
}
