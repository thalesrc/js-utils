/**
 * #### Removes `null` and `undefined` values and their keys from an object
 *
 * Additional values can be removed by passing to an array as the second argument
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
 * @param additionalValuesToRemove Other values to delete
 * @returns Compacted object
 */
export function compact<T extends Record<string|number|symbol, any>>(
  object: T,
  additionalValuesToRemove: any[] = []
): Partial<T> {
  const newObject = {...object};
  const valuesToRemove = [undefined, null, ...additionalValuesToRemove];

  for (const [key, value] of Object.entries(newObject)) {
    if (valuesToRemove.includes(value)) {
      delete newObject[key];
    }
  }

  return newObject;
}
