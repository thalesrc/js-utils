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
     * base.difference(["a", "b"], true); // ["c", "d", "a", "b", "c", "d"]
     * ```
     * * * *
     * @param base Base Array
     * @param substraction Set or Array to remove its values from the base
     * @param allDiff By default all the same items encountered in substraction will be removed, set this argument as true to get real difference
     * @returns Difference of base from substraction
     */
    difference(substraction: TSubstraction, allDiff?: boolean): T[];
  }
}

Array.prototype.difference = function(substraction: TSubstraction, allDiff = false) {
  return difference(this, substraction, allDiff);
}
