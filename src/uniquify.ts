/**
 * #### Uniquify
 *
 * Removes repeated items from the array
 *
 * * * *
 * Example:
 * ```typescript
 * import { uniquify } "@thalesrc/js-utils";
 *
 * const array = ["a", "b", "c", "a", "b", "c"];
 *
 * uniquify(array); // ["a", "b", "c"]
 * ```
 * * * *
 * @return The new uniquified array
 */
export function uniquify<T>(array: T[]): T[] {
  return [...new Set(array)];
}
