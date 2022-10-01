import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ScrollSpy } from './scroll-spy';
import { SpyTarget } from './models/spy-target';
import { SpyTargetIsIntersectingEvent } from './models/spy-target-is-intersecting-event';

/**
 * Scroll spy service.
 *
 * Creates a scroll-spy on the Document/Body per default and destroys it when the service is destroyed.
 *
 * Allows you to create (and destroy) scroll-spy on a scroll-container (any scrollable element).
 */
@Injectable({
  providedIn: 'root'
})
export class ScrollSpyService implements OnDestroy {
  /**
   * Default scroll-spy on the default scroll element (Document/Body).
   */
  private readonly defaultScrollSpy: ScrollSpy = new ScrollSpy();
  /**
   * Map containing created scroll-spies (on any scrollable elements).
   *
   * @key scrollContainerId
   * @value ScrollSpy
   */
  private readonly scrollSpies: Map<string, ScrollSpy> = new Map();

  constructor() { }

  ngOnDestroy(): void {
    this.defaultScrollSpy.stopSpying();
    this.scrollSpies.forEach((item) => item.stopSpying());
    this.scrollSpies.clear();
  }

  /**
   * Create a scroll-spy for the provided `scrollContainer`.
   */
  createScrollSpy(scrollContainerId: string, scrollContainer: Element): void {
    this.scrollSpies.set(scrollContainerId, new ScrollSpy({ scrollContainer }));
  }

  /**
   * Destroy the scroll-spy with ID equals the provided `scrollContainerId`.
   */
  destroyScrollSpy(scrollContainerId: string): void {
    this.scrollSpies.get(scrollContainerId)?.stopSpying();
    this.scrollSpies.delete(scrollContainerId);
  }

  /**
   * Get the `spyTargetIsIntersecting$` observable for the provided `scrollContainerId`,
   *
   * Or the `spyTargetIsIntersecting$` of the `defaultScrollSpy` when `scrollContainerId` is `undefined`.
   */
  getSpyTargetIsIntersecting$(scrollContainerId?: string): Observable<SpyTargetIsIntersectingEvent> {
    return this.getScrollSpy(scrollContainerId).spyTargetIsIntersecting$;
  }

  /**
   * Adds a spy-target and starts to observe that target.
   */
  addTarget(spyTarget: SpyTarget): void {
    this.getScrollSpy(spyTarget.containerId).addTarget(spyTarget);
  }

  /**
   * Removes a spy-target and stops observing that target.
   */
  removeTarget(spyTarget: SpyTarget): void {
    this.getScrollSpy(spyTarget.containerId).removeTarget(spyTarget);
  }

  /**
   * Get the scroll-spy for the proivded `scrollContainerId`.
   *
   * When `scrollContainerId` is `undefined` the `defaultScrollSpy` is returned.
   */
  private getScrollSpy(scrollContainerId?: string): ScrollSpy {
    if (!scrollContainerId) {
      return this.defaultScrollSpy;
    }
    const scrollSpy = this.scrollSpies.get(scrollContainerId);
    if (!scrollSpy) {
      throw new Error(`Unknown spyTargetContainerId: "${scrollContainerId}". Please make sure that the spyTargetContainerId inputs have the same value on the three directives: spy, spyTarget and spyTargetContainer.`);
    }
    return scrollSpy;
  }
}
