import { remove } from "../remove";

declare global {
  export interface Array<T> {
    /**
     * #### Remove
     *
     * Removes an item from the array
     *
     * Removes all item references if multi is set to `true`
     *
     * * * *
     * Example:
     * ```typescript
     * import "@thalesrc/js-utils/dist/as-proto/array-remove";
     *
     * const array = ["a", "b", "c", "a", "b", "c"];
     *
     * array.remove("b", true); // ["a", "c", "a", "c"]
     * ```
     * * * *
     * @param itemToRemove Item to remove
     * @return New array
     */
    remove(itemToRemove: T, multi?: boolean): T[];
  }
}

Array.prototype.remove = <any>function<T>(this: T[], itemToRemove: T, multi: boolean = false): T[] {
  return remove.call(null, this, ...arguments);
}
