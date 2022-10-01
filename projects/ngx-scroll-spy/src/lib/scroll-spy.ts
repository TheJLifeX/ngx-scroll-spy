import { Subject, Subscription, fromEvent, debounceTime, Observable } from 'rxjs';
import { ScrollSpyOptions } from './models/scroll-spy-options';
import { SpyTarget } from './models/spy-target';
import { SpyTargetIsIntersectingEvent } from './models/spy-target-is-intersecting-event';

/**
 * Encapsulates the logic for scroll spy on a scrollable element (`scrollContainer`).
 *
 * Scroll spy uses the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).
 *
 * Supports window resizing.
 *
 * Inspired by:
 * - https://grafikart.fr/tutoriels/scrollspy-js-page-491
 * - https://codepen.io/diaphragm/pen/bGNBVxw
 * - https://github.com/chefomar/angular-scroll-spy
 */
export class ScrollSpy {

  private readonly spyTargetIsIntersectingSubject$: Subject<SpyTargetIsIntersectingEvent> = new Subject<SpyTargetIsIntersectingEvent>();
  /**
   * Is emitted when a spy-target has transitioned into a state of intersection (`isIntersecting: true`) or out of a state of intersection (`isIntersecting: false`).
   */
  readonly spyTargetIsIntersecting$: Observable<SpyTargetIsIntersectingEvent> = this.spyTargetIsIntersectingSubject$.asObservable();
  private resizeSubscription?: Subscription;
  private spyTargets: SpyTarget[] = [];
  private intersectionObserver: IntersectionObserver | null = null;
  private readonly resizeDebounceTime: number = 300;
  /**
   * Defines the (vertical) position of the IntersectionObserver line.
   * Value between `0` (at the top) and `100` (at the bottom).
   *
   * @todo (For a future version of ngx-scroll-spy) This property should be configured by the user.
   */
  private readonly offset: number = 20;

  constructor({ scrollContainer }: ScrollSpyOptions = {}) {
    this.initIntersectionObserver(scrollContainer);

    this.resizeSubscription = fromEvent(window, 'resize').pipe(
      debounceTime(this.resizeDebounceTime)
    ).subscribe(() => this.initIntersectionObserver(scrollContainer));
  }

  /**
   * Adds a spy-target and starts to observe that target.
   */
  addTarget(spyTarget: SpyTarget): void {
    this.spyTargets.push(spyTarget);
    this.intersectionObserver?.observe(spyTarget.element);
  }

  /**
   * Removes a spy-target and stops observing that target.
   */
  removeTarget(spyTarget: SpyTarget): void {
    this.spyTargets = this.spyTargets.filter(spyTarget => spyTarget.id !== spyTarget.id);
    this.intersectionObserver?.unobserve(spyTarget.element);
  }

  /**
   * Stops observing all spy-targets and completes spyTargetIsIntersecting$ subject.
   */
  stopSpying(): void {
    this.resizeSubscription?.unsubscribe();
    this.intersectionObserver?.disconnect();
    this.intersectionObserver = null;
    this.spyTargets = [];
    this.spyTargetIsIntersectingSubject$.complete();
  }

  /**
   * Initialize IntersectionObserver.
   */
  private initIntersectionObserver(scrollContainer?: Element): void {
    this.intersectionObserver?.disconnect();
    this.intersectionObserver = new IntersectionObserver(
      (entries) => this.intersectionObserverCallback(entries),
      {
        root: scrollContainer,
        rootMargin: `-${this.offset}% 0px -${100 - this.offset}% 0px` // IntersectionObserver as one line.
      }
    );
    for (const spyTarget of this.spyTargets) {
      this.intersectionObserver.observe(spyTarget.element);
    }
  }

  /**
   * A function which is called when one or more spy-targets have transitioned into a state of intersection (`isIntersecting: true`) or out of a state of intersection (`isIntersecting: false`).
   */
  private intersectionObserverCallback(entries: IntersectionObserverEntry[]): void {
    for (const entry of entries) {
      const spyTarget = this.spyTargets.find((item) => item.element === entry.target)!;
      this.spyTargetIsIntersectingSubject$.next({
        spyTarget,
        isIntersecting: entry.isIntersecting
      });
    }
  }
}
