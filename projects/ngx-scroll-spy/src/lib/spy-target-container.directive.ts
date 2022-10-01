import { isPlatformServer } from '@angular/common';
import { Directive, Input, OnInit, OnDestroy, Inject, PLATFORM_ID, ElementRef } from '@angular/core';
import { ScrollSpyService } from './scroll-spy.service';

/**
 * Creates a scroll-spy on this spy targets container (element).
 *
 * Automatically destroys the scroll-spy when the element is destroyed.
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
