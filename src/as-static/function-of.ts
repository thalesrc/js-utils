import { functionOf } from "../function-of";

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
     * import "@thalesrc/js-utils/as-static/function-of";
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
    of: typeof functionOf;
  }
}

Function.of = functionOf;
