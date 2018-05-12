import { intersection, TInclusion } from "../intersection";

declare global {
  export interface Array<T> {
    /**
     * #### Intersection
     *
     * Gets the intersection of the two arrays or sets
     *
     * * * *
     * Example:
     * ```typescript
     * import "@gen-tech/js-utils/dist/as-proto/array-intersection";
     *
     * const base = ["a", "b", "c", "d", "a", "b", "c", "d"];
     *
     * base.intersection(["a", "b"]); // ["a", "b", "a", "b"]
     * base.intersection(["a", "b"], false); // ["a", "b"]
     * ```
     * * * *
     * @param base Base Set or Array
     * @param inclusion Set or Array to include its values
     * @param allEquals By default all the same items encountered in the inclusion will be included, set this argument as false to get real intersection
     * @returns Intersection of base and inclusion
     */
    intersection(inclusion: TInclusion, allEquals?: boolean): T[];
  }
}

Array.prototype.intersection = function(inclusion: TInclusion, allEquals = true) {
  return intersection(this, inclusion, allEquals);
}
