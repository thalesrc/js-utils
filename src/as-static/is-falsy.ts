import { isFalsy } from "../is-falsy";

declare global {
  export interface BooleanConstructor {
    /**
     * #### Returns whether the entered value is falsy
     *
     * * * *
     * Example usage:
     * ```typescript
     * import "@gen-tech/js-utils/dist/as-static/is-falsy";
     *
     * Boolean.isFalsy(undefined); // true
     * Boolean.isFalsy(true); // false
     * Boolean.isFalsy([]) // false
     *
     * const falsyValues = ["a", undefined, "b", "", "c"].filter(Boolean.isFalsy); // [undefined, ""]
     * ```
     * * * *
     * @param value value to be checked
     */
    isFalsy: typeof isFalsy;
  }
}

Boolean.isFalsy = isFalsy;
