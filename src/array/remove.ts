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
 * import { remove } from "@thalesrc/js-utils/array";
 *
 * const array = ["a", "b", "c", "a", "b", "c"];
 *
 * remove(array, "b"); // ["a", "c", "a", "b", "c"]
 * remove(array, "b", true); // ["a", "c", "a", "c"]
 * ```
 *
 * Prototype Example:
 * ```typescript
 * import "@thalesrc/js-utils/array/proto/remove";
 *
 * const array = ["a", "b", "c", "a", "b", "c"];
 *
 * array.remove("b"); // ["a", "c", "a", "b", "c"]
 * array.remove("b", true); // ["a", "c", "a", "c"]
 * ```
 * * * *
 * @param array: Array to remove the item
 * @param itemToRemove Item to remove
 * @return New array
 */
export function remove<T = any>(array: T[], item: T, multi = false): T[] {
  let index: number = array.indexOf(item);

  if (index < 0) {
    return [...array];
  }

  do {
    array = [...array.slice(0, index), ...array.slice(index + 1)];
    index = array.indexOf(item);
  } while (multi && index > -1);

  return array;
}
