import { deepest } from '../deepest';

declare global {
  export interface ObjectConstructor {
    /**
     * #### Get deepest value in an object chain
     *
     *  * * * *
     * Example usage:
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
    deepest: typeof deepest;
  }
}

Object.deepest = deepest;
