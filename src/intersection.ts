/**
 * Intersection Inclusion Type
 */
export type TInclusion = any[] | Set<any>;

/**
 * #### Intersection
 *
 * Gets the intersection of the two arrays or sets
 *
 * * * *
 * Example:
 * ```typescript
 * import { intersection } from "@thalesrc/js-utils";
 *
 * const base = ["a", "b", "c", "d", "a", "b", "c", "d"];
 *
 * intersection(base, ["a", "b", "x"]); // ["a", "b", "a", "b"]
 * intersection(base, ["a", "b", "x"], false); // ["a", "b"]
 * ```
 * Array Prototype Example:
 * ```typescript
 * import "@thalesrc/js-utils/dist/as-proto/array-intersection";
 *
 * const base = ["a", "b", "c", "d", "a", "b", "c", "d"];
 *
 * base.intersection(["a", "b"]); // ["a", "b", "a", "b"]
 * ```
 * Set Prototype Example:
 * ```typescript
 * import "@thalesrc/js-utils/dist/as-proto/set-intersection";
 *
 * const base = new Set(["a", "b", "c", "d"]);
 *
 * base.intersection(["a", "b"]); // Set(["a", "b"])
 * ```
 * * * *
 * @param base Base Set or Array
 * @param inclusion Set or Array to include its values
 * @param allEquals By default all the same items encountered in the inclusion will be included, set this argument as false to get real intersection
 * @returns Intersection of base and inclusion
 */
export function intersection<T>(base: T[], inclusion: TInclusion, allEquals?: boolean): T[];
export function intersection<T>(base: Set<T>, inclusion: TInclusion, allEquals?: boolean): Set<T>;
export function intersection<T>(base: T[] | Set<T>, inclusion: TInclusion, allEquals = true): T[] | Set<T> {
  if (base instanceof Set) {
    return new Set<T>(intersection(Array.from(base), inclusion));
  }

  const incs: T[] = Array.from(inclusion);

  return base.filter(value => {
    const index = incs.indexOf(value);

    if (index > -1 && !allEquals) {
      incs.splice(index, 1);
    }

    return index > -1;
  });
}
