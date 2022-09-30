import { isPlatformServer } from '@angular/common';
import { Directive, ElementRef, Input, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';

import { ScrollSpyService } from './scroll-spy.service';
import { SpyTarget } from './spy-target';

/**
 * Scroll spy target.
 */
@Directive({
  selector: '[spyTarget]',
  standalone: true
})
export class SpyTargetDirective implements OnInit, OnDestroy {

  @Input() spyTargetId!: string;
  @Input() spyTargetContainerId?: string;

  private target!: SpyTarget;

  constructor(
    private elementRef: ElementRef<Element>,
    private scrollSpyService: ScrollSpyService,
    @Inject(PLATFORM_ID) private platformId: string
  ) { }

  ngOnInit(): void {
    if (!this.spyTargetId) {
      throw new Error('SpyTargetDirective: spyTargetId needs to be set.');
    }
    if (isPlatformServer(this.platformId)) {
      return;
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
