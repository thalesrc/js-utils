/**
 * #### Uniquify By Key
 *
 * Removes objects from the array which the value of its specifed key included before by another
 *
 * * * *
 * Example:
 * ```typescript
 * import { uniquifyByKey } "@thalesrc/js-utils/array";
 *
 * const array = [{a: 1}, {a: 1}, {a: 2}, {a: 3}, {a: 3}, {a: 4}];
 *
 * uniquifyByKey(array, 'a'); // [{a: 1}, {a: 2}, {a: 3}, {a: 4}]
 * ```
 *
 * Prototype Example:
 * ```typescript
 * import "@thalesrc/js-utils/array/proto/uniquify-by-key";
 *
 * const array = [{a: 1}, {a: 1}, {a: 2}, {a: 3}, {a: 3}, {a: 4}];
 *
 * array.uniquifyByKey('a'); // [{a: 1}, {a: 2}, {a: 3}, {a: 4}]
 * ```
 * * * *
 * @param array Collection of the objects
 * @param key Key to search the value on
 * @return The new uniquified array
 */
export function uniquifyByKey<T extends Object, P extends keyof T>(array: T[], key: P): T[] {
  const cache = new Set<T[P]>();

  return array.filter(item => {
    if (cache.has(item[key])) {
      return false;
    }

    cache.add(item[key]);

    return true;
  });
}
