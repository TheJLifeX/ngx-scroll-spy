export interface SpyTarget {
  id: string;
  element: Element;
  /**
   * ID of the scroll-container containing the spy-target.
   *
   * When value is `undefined`, this means, spy-target belongs to the defauft scroll-spy-container (Document/Body).
   */
  containerId?: string;
}
