export interface SpyTarget {
  id: string;
  element: Element;
  /**
   * ID of the Scroll container containing scroll targets.
   */
  containerId?: string;
}
