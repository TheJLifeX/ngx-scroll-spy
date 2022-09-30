import { Subject, Subscription, fromEvent, debounceTime } from 'rxjs';
import { SpyTarget } from './spy-target';

/**
 * Class containing the logic for scroll spy.
 *
 * Inspired by:
 * - https://grafikart.fr/tutoriels/scrollspy-js-page-491
 * - https://codepen.io/diaphragm/pen/bGNBVxw
 * - https://github.com/chefomar/angular-scroll-spy
 */
export class ScrollSpy {

  private readonly activeSpyTargetChangedSubject$ = new Subject<SpyTargetChangedEvent>();
  /**
   * Emits the active spy target events.
   */
  readonly activeSpyTargetChanged$ = this.activeSpyTargetChangedSubject$.asObservable();
  private resizeSubscription?: Subscription;
  private spyTargets: SpyTarget[] = [];
  private isSpying: boolean = false;
  private intersectionObserver: IntersectionObserver | null = null;
  private readonly resizeDebounceTime: number = 300;
  /**
   * Defines the (vertical) position of the IntersectionObserver line.
   * Value between `0` (at the top) and `100` (at the bottom).
   *
   * @todo (For a future version) This property can be configured by the user.
   */
  private readonly ratio: number = 20;

  constructor(options: ScrollSpyOptions = {}) {
    this.startSpying(options.scrollContainer);
  }

  addTarget(spyTarget: SpyTarget): void {
    this.spyTargets.push(spyTarget);
    this.intersectionObserver?.observe(spyTarget.element);
  }

  removeTarget(spyTarget: SpyTarget): void {
    this.spyTargets = this.spyTargets.filter(spyTarget => spyTarget.id !== spyTarget.id);
    this.intersectionObserver?.unobserve(spyTarget.element);
  }

  stopSpying(): void {
    if (!this.isSpying) {
      return;
    }
    this.resizeSubscription?.unsubscribe();
    this.intersectionObserver?.disconnect();
    this.intersectionObserver = null;
    this.spyTargets = [];

    this.activeSpyTargetChangedSubject$.complete();
    this.isSpying = false;
  }

  private startSpying(scrollContainer?: Element): void {
    if (this.isSpying) {
      return;
    }
    this.isSpying = true;

    this.initIntersectionObserver(scrollContainer);

    this.resizeSubscription = fromEvent(window, 'resize').pipe(
      debounceTime(this.resizeDebounceTime)
    ).subscribe(() => this.initIntersectionObserver(scrollContainer));
  }

  /**
   * Initialize intersection observer.
   */
  private initIntersectionObserver(scrollContainer?: Element): void {
    this.intersectionObserver?.disconnect();
    this.intersectionObserver = new IntersectionObserver(
      (entries) => this.intersectionObserverCallback(entries),
      {
        root: scrollContainer,
        rootMargin: `-${this.ratio}% 0px -${100 - this.ratio}% 0px` // IntersectionObserver as one line.
      }
    );
    for (const spyTarget of this.spyTargets) {
      this.intersectionObserver.observe(spyTarget.element);
    }
  }

  private intersectionObserverCallback(entries: IntersectionObserverEntry[]): void {
    for (const entry of entries) {
      const spyTarget = this.spyTargets.find((item) => item.element === entry.target);
      this.activeSpyTargetChangedSubject$.next({
        spyTarget: spyTarget!,
        isIntersecting: entry.isIntersecting
      });
    }
  }
}

export interface SpyTargetChangedEvent {
  spyTarget: SpyTarget;
  isIntersecting: boolean;
}

export interface ScrollSpyOptions {
  scrollContainer?: Element;
}
