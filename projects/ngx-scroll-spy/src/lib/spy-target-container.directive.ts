import { isPlatformServer } from '@angular/common';
import { Directive, Input, OnInit, OnDestroy, Inject, PLATFORM_ID, ElementRef } from '@angular/core';
import { ScrollSpyService } from './scroll-spy.service';

/**
 * Creates a scroll-spy on this spy targets container (element).
 *
 * Automatically destroys the scroll-spy when the element is destroyed.
 *
 * This is useful:
 *
 * - when you have multiple (independent) scrollable elements on the same page,
 * - or the scrollable element on your page is not the browser default scrollable element, for example `<mat-sidenav-content>` if you are using [Angular Material Sidenav](https://material.angular.io/components/sidenav)
 *
 * where you want to have a scroll-spy.
 */
@Directive({
  selector: '[spyTargetContainer]',
  standalone: true
})
export class SpyTargetContainerDirective implements OnInit, OnDestroy {

  /**
   * ID for this spyTargetContainer.
   */
  @Input() spyTargetContainerId!: string;

  constructor(
    private scrollSpyService: ScrollSpyService,
    @Inject(PLATFORM_ID) private platformId: string,
    private elementRef: ElementRef<Element>,
  ) { }

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }
    if (!this.spyTargetContainerId) {
      throw new Error('SpyTargetContainerDirective: spyTargetContainerId needs to be set.');
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
