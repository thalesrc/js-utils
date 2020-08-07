import { compact as objCompact } from './object';
import { compact as arrCompact } from './array';

export function compact<T = any>(array: T[]): T[];
export function compact<T extends Object>(object: T): Partial<T>;
/**
 * #### Compact
 *
 * Filters falsy values of the given array
 * Removes `null` and `undefined` values and their keys from an object
 *
 * * * *
 * Example usage:
 * ```typescript
 * import { compact } from "@thalesrc/js-utils";
 *
 * const arr = [undefined, "", false, 0, 1, "1"];
 * const compacted = compact(arr); // [1, "1"];
 *
 * const object = {
 *  x: null,
 *  y: undefined,
 *  z: 20
 * };
 *
 * const compacted = compact(object); // {z: 20}
 * ```
 * * * *
 * @param arrayOrObject Array or Object to compact
 */
export function compact<T extends (U[] | Object), U>(arrayOrObject: T): T extends U[] ? U[] : Object {
  if (arrayOrObject instanceof Array) {
    return arrCompact(arrayOrObject) as any;
  }

  if (arrayOrObject instanceof Object) {
    return objCompact(arrayOrObject) as any;
  }

  throw new TypeError('Value is not object nor array');
}

