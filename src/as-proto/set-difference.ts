import { difference, TSubstraction } from "../difference";

declare global {
  export interface Set<T> {
    /**
     * #### Difference
     *
     * Gets the difference of the sets
     *
     * * * *
     * Example:
     * ```typescript
     * import "@gen-tech/js-utils/dist/as-proto/set-difference";
     *
     * const base = new Set(["a", "b", "c", "d"]);
     *
     * base.difference(["a", "b"]); // Set(["c", "d"])
     * ```
     * * * *
     * @param base Base Set
     * @param substraction Set or Array to remove its values from the base
     * @returns Difference of base from substraction
     */
    difference(substraction: TSubstraction): Set<T>;
  }
}

Set.prototype.difference = function<T>(this: Set<T>, substraction: TSubstraction) {
  return difference(this, substraction);
}
