import { isPlatformServer } from '@angular/common';
import { Directive, ElementRef, Input, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { ScrollSpyService } from './scroll-spy.service';
import { SpyTarget } from './models/spy-target';

/**
 * Adds this element as spy-target and starts to observe this target.
 *
 * Automatically removes this element as spy-target and stops observing this target when the element is destroyed.
 */
@Directive({
  selector: '[spyTarget]',
  standalone: true
})
export class SpyTargetDirective implements OnInit, OnDestroy {

  /**
   * ID for this spyTarget.
   */
  @Input() spyTargetId!: string;

  /**
   * @optional
   *
   * ID for the spyTargetContainer containing this spyTarget.
   */
  @Input() spyTargetContainerId?: string;

  private target!: SpyTarget;

  constructor(
    private elementRef: ElementRef<Element>,
    private scrollSpyService: ScrollSpyService,
    @Inject(PLATFORM_ID) private platformId: string
  ) { }

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }
    if (!this.spyTargetId) {
      throw new Error('SpyTargetDirective: spyTargetId needs to be set.');
    }
    this.target = {
      id: this.spyTargetId,
      element: this.elementRef.nativeElement,
      containerId: this.spyTargetContainerId
    };
    this.scrollSpyService.addTarget(this.target);
  }

  ngOnDestroy(): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }
    this.scrollSpyService.removeTarget(this.target);
  }
}
