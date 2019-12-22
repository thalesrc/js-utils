/**
 * #### Uniquify
 *
 * Removes repeated items from the array
 *
 * * * *
 * Example:
 * ```typescript
 * import { uniquify } "@thalesrc/js-utils/array";
 *
 * const array = ["a", "b", "c", "a", "b", "c"];
 *
 * uniquify(array); // ["a", "b", "c"]
 * ```
 *
 * Prototype Example:
 * ```typescript
 * import "@thalesrc/js-utils/array/proto/uniquify";
 *
 * const array = ["a", "b", "c", "a", "b", "c"];
 *
 * array.uniquify(); // ["a", "b", "c"]
 * ```
 * * * *
 * @return The new uniquified array
 */
export function uniquify<T>(array: T[]): T[] {
  return [...new Set(array)];
}
