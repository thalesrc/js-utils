import { intersection, TInclusion } from "../intersection";

declare global {
  export interface Set<T> {
    /**
     * #### Intersection
     *
     * Gets the intersection of the two arrays or sets
     *
     * * * *
     * Example:
     * ```typescript
     * import "@gen-tech/js-utils/dist/as-proto/set-intersection";
     *
     * const base = new Set(["a", "b", "c", "d"]);
     *
     * base.intersection(["a", "b"]); // Set(["a", "b"])
     * ```
     * * * *
     * @param base Base Set
     * @param inclusion Set or Array to include its values
     * @param allEquals By default all the same items encountered in the inclusion will be included, set this argument as false to get real intersection
     * @returns Intersection of base and inclusion
     */
    intersection(inclusion: TInclusion, allEquals?: boolean): Set<T>;
  }
}

Set.prototype.intersection = function<T>(this: Set<T>, inclusion: TInclusion, allEquals = true) {
  return intersection(this, inclusion, allEquals);
}
