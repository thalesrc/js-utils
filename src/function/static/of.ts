import { of } from '../of';

declare global {
  export interface FunctionConstructor {
    /**
     * ### Function Of
     *
     * Creates a function which returns the value given
     *
     * * * *
     * Example:
     * ```typescript
     * import "@thalesrc/js-utils/function/static/of";
     *
     * const base = [1, 2, 5, {}, "x", "y"];
     * const mapTo = Function.of("thales rocks");
     *
     * const mapped = base.map(mapTo);
     * // ["thales rocks", "thales rocks", "thales rocks", "thales rocks", "thales rocks", "thales rocks"]
     * ```
     * * * *
     * @param returnValue The value which created function returns
     * @returns A function which returns the `returnValue`
     */
    of: typeof of;
  }
}

Function.of = of;
