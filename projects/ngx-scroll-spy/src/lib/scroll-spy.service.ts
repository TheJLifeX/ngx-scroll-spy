import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ScrollSpy, SpyTargetChangedEvent } from './scroll-spy';
import { SpyTarget } from './spy-target';

/**
 * Scroll spy service.
 */
@Injectable({
  providedIn: 'root'
})
export class ScrollSpyService implements OnDestroy {
  /**
   * Default scroll spy on the default scroll element (Document/Body).
   */
  private readonly defaultScrollSpy = new ScrollSpy();
  /**
   * Scroll spies on other scroll elements
   */
  private readonly scrollSpies: Map<string, ScrollSpy> = new Map();
  private readonly serviceDestroyed$ = new Subject<void>();

  constructor() { }

  ngOnDestroy(): void {
    this.serviceDestroyed$.next();
    this.serviceDestroyed$.complete();
    this.scrollSpies.forEach((item) => item.stopSpying());
    this.defaultScrollSpy.stopSpying();
  }

  /**
   * Create a scroll spy for the specified scroll container.
   */
  createScrollSpy(scrollContainerId: string, scrollContainer: Element): void {
    const scrollSpy = new ScrollSpy({ scrollContainer });
    this.scrollSpies.set(scrollContainerId, scrollSpy);
  }

  destroyScrollSpy(scrollContainerId: string): void {
    this.scrollSpies.get(scrollContainerId)?.stopSpying();
    this.scrollSpies.delete(scrollContainerId);
  }

  getActiveSpyTargetChanged$(scrollContainerId?: string): Observable<SpyTargetChangedEvent> {
    return this.getScrollSpy(scrollContainerId).activeSpyTargetChanged$
  }

  addTarget(spyTarget: SpyTarget): void {
    const scrollSpy = this.getScrollSpy(spyTarget.containerId);
    scrollSpy.addTarget(spyTarget);
  }

  removeTarget(spyTarget: SpyTarget): void {
    const scrollSpy = this.getScrollSpy(spyTarget.containerId);
    scrollSpy?.removeTarget(spyTarget);
  }

  private getScrollSpy(scrollContainerId?: string): ScrollSpy {
    if (!scrollContainerId) {
      return this.defaultScrollSpy;
    }
    const scrollSpy = this.scrollSpies.get(scrollContainerId);
    if (!scrollSpy) {
      throw new Error(`Unknown spyTargetContainerId: "${scrollContainerId}". Please make sure that the spyTargetContainerId inputs have the same value on the three spy, spyTarget and spyTargetContainer directives.`);
    }
    return scrollSpy;
  }
}
