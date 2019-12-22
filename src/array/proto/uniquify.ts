import { uniquify } from '../uniquify';

declare global {
  export interface Array<T> {
    /**
     * #### Uniquify
     *
     * Removes repeated items from the array
     *
     * * * *
     * Example:
     * ```typescript
     * import "@thalesrc/js-utils/dist/as-proto/array-uniquify";
     *
     * const array = ["a", "b", "c", "a", "b", "c"];
     *
     * array.uniquify(); // ["a", "b", "c"]
     * ```
     * * * *
     * @return The new uniquified array
     */
    uniquify(): T[];
  }
}

Array.prototype.uniquify = <any>function<T>(this: T[]): T[] {
  return uniquify(this);
};
