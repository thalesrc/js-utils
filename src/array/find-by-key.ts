/**
 * #### Find By Key
 *
 * Finds an object in an array by matching the value set on the key
 *
 * * * *
 * Example:
 * ```typescript
 * import { findByKey } from "@thalesrc/js-utils/array";
 *
 * const array = [{a: 1}, {a: 2}, {a: 3}];
 *
 * findByKey(array, "a", 2); // {a: 2}
 * ```
 *
 * Prototype Example:
 * ```typescript
 * import "@thalesrc/js-utils/array/proto/find-by-key";
 *
 * const array = [{a: 1}, {a: 2}, {a: 3}];
 *
 * array.findByKey("a", 2); // {a: 2}
 * ```
 * * * *
 * @param array Collection of the objects
 * @param key Key to search the value on
 * @param value Value to match for the key
 * @return Found object or undefined
 */
export function findByKey<T, K extends keyof T>(array: T[], key: K, value: T[K]): T {
  return array.find(item => item[key] === value);
}
