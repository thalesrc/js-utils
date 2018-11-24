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
     * import "@thalesrc/js-utils/dist/as-proto/set-difference";
     *
     * const base = new Set(["a", "b", "c", "d"]);
     *
     * base.difference(["a", "b"]); // Set(["c", "d"])
     * ```
     * * * *
     * @param base Base Set
     * @param substraction Set or Array to remove its values from the base
     * @param allDiff By default all the same items encountered in substraction will be removed, set this argument as true to get real difference
     * @returns Difference of base from substraction
     */
    difference(substraction: TSubstraction, allDiff?: boolean): Set<T>;
  }
}

Set.prototype.difference = function<T>(this: Set<T>, substraction: TSubstraction, allDiff = false) {
  return difference(this, substraction, allDiff);
}
