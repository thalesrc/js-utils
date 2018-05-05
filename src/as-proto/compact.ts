import { compact } from "../compact";

declare global {
  export interface Array<T> {
    /**
     * Filters falsy values of the given array
     *
     * __Does not modify the original array__
     *
     * Values to be filtered: `[undefined, null, "", 0, false, NaN]`
     *
     * @returns T[] filtered array
     */
    compact(): T[];
  }
}

Array.prototype.compact = function() {
  return compact(this);
}
