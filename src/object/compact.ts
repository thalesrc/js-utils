/**
 * #### Removes `null` and `undefined` values and their keys from an object
 *
 *  * * * *
 * Example usage:
 * ```typescript
 * import { compact } from "@thalesrc/js-utils/object";
 *
 * const a = {
 *  x: null,
 *  y: undefined,
 *  z: 20
 * };
 *
 * compact(a); // {z: 20}
 *
 * ```
 * Static usage example:
 * ```typescript
 * import "@thalesrc/js-utils/object/static/compact";
 *
 * const a = {
 *  x: null,
 *  y: undefined,
 *  z: 20
 * };
 *
 * Object.compact(a); // {z: 20}
 * ```
 * * * *
 * @param object Object delete empty keys
 * @returns Compacted object
 */
export function compact<T extends Object>(object: T): Partial<T> {
  const newObject = {...object};

  for (const [key, value] of Object.entries(newObject)) {
    if (value === undefined || value === null) {
      delete newObject[key];
    }
  }

  return newObject;
}
