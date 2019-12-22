import { isTruthy } from '../../is-truthy';

declare global {
  export interface BooleanConstructor {
    /**
     * #### Returns whether the entered value is truthy
     *
     * * * *
     * Example usage:
     * ```typescript
     * import "@thalesrc/js-utils/dist/as-static/is-truthy";
     *
     * Boolean.isTruthy(undefined); // false
     * Boolean.isTruthy(true); // true
     * Boolean.isTruthy([]) // true
     *
     * const truthyValues = ["a", undefined, "b", "", "c"].filter(Boolean.isTruthy); // ["a", "b", "c"]
     * ```
     * * * *
     * @param value value to be checked
     */
    isTruthy: typeof isTruthy;
  }
}

Boolean.isTruthy = isTruthy;
