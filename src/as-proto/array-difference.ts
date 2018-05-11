import { difference, TSubstraction } from "../difference";

declare global {
  export interface Array<T> {
    /**
     * #### Difference
     *
     * Gets the difference of the arrays
     *
     * * * *
     * Example:
     * ```typescript
     * import "@gen-tech/js-utils/dist/as-proto/array-difference";
     *
     * const base = ["a", "b", "c", "d", "a", "b", "c", "d"];
     *
     * base.difference(["a", "b"]); // ["c", "d", "c", "d"]
     * ```
     * * * *
     * @param base Base Array
     * @param substraction Set or Array to remove its values from the base
     * @returns Difference of base from substraction
     */
    difference(substraction: TSubstraction): T[];
  }
}

Array.prototype.difference = function(substraction: TSubstraction) {
  return difference(this, substraction);
}
