import { clone } from '../clone';

declare global {
  export interface ObjectConstructor {
    /**
     * #### Deep Clone
     *
     * A function to recursively clone objects, arrays etc. with [cloning options]{@link ICloneOptions}
     *
     * *References Functions & Symbols by default*
     *
     * * * *
     * Example:
     * ```typescript
     * import { clone } from "@thalesrc/js-utils";
     *
     * const object = {a: 1, b: {c: true, d: ["x", "y"]}};
     *
     * // Clone all
     * const clonedObject = clone(object);
     * // {a: 1, b: {c: true, d: ["x", "y"]}}
     * // object.b.d === clonedObject.b.d // false
     *
     * // Clone all but reference "d"
     * const clonedObject = clone(object, {propsToRefer: ["d"]});
     * // {a: 1, b: {c: true, d: ["x", "y"]}}
     * // object.b.d === clonedObject.b.d // true
     * ```
     *
     * Static usage example:
     * ```typescript
     * import "@thalesrc/js-utils/dist/as-static/clone";
     *
     * const object = {a: 1, b: 2};
     * const clonedObject = Object.clone(object); // {a: 1, b: 2}
     * ```
     * * * *
     * @param objectToClone Object to clone
     * @param options {ICloneOptions} Cloning Options
     * @see {@link ICloneOptions} for more information.
     */
    clone: typeof clone;
  }
}

Object.clone = clone;
