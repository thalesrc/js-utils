import { compact } from '../compact';

declare global {
  export interface ObjectConstructor {
    /**
     * #### Removes `null` and `undefined` values and their keys from an object
     *
     *  * * * *
     * Example usage:
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
    compact: typeof compact;
  }
}

Object.compact = compact;
