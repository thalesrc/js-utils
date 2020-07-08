/**
 * #### Get deepest value in an object chain
 *
 *  * * * *
 * Example usage:
 * ```typescript
 * import { deepest } from "@thalesrc/js-utils/object";
 *
 * const a = {
 *  x: null
 * };
 *
 * const b = {
 *  x: a
 * };
 *
 * const c = {
 *  x: b
 * };
 *
 * deepest(c, 'x'); // {x: null} (a)
 *
 * ```
 * Static usage example:
 * ```typescript
 * import "@thalesrc/js-utils/object/static/deepest";
 *
 * const a = {
 *  x: null
 * };
 *
 * const b = {
 *  x: a
 * };
 *
 * const c = {
 *  x: b
 * };
 *
 * Object.deepest(c, 'x'); // a
 * ```
 * * * *
 * @param object Object to deep dive
 * @param key key of the object which contains same type instance
 */
export function deepest<T, K extends {[P in keyof T]: T[P] extends T ? P : never}[keyof T]>(object: T, key: K): T {
  let obj: any = object;

  while (obj[key]) {
    obj = obj[key];
  }

  return obj;
}
