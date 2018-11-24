/**
 * Difference Substraction Type
 */
export type TSubstraction = any[] | Set<any>;

/**
 * #### Difference
 *
 * Gets the difference of the two arrays or sets
 *
 * * * *
 * Example:
 * ```typescript
 * import { difference } from "@thalesrc/js-utils";
 *
 * const base = ["a", "b", "c", "d", "a", "b", "c", "d"];
 *
 * difference(base, ["a", "b"]); // ["c", "d", "c", "d"]
 * difference(base, ["a", "b"], true); // ["c", "d", "a", "b", "c", "d"]
 * ```
 * Array Prototype Example:
 * ```typescript
 * import "@thalesrc/js-utils/dist/as-proto/array-difference";
 *
 * const base = ["a", "b", "c", "d", "a", "b", "c", "d"];
 *
 * base.difference(["a", "b"]); // ["c", "d", "c", "d"]
 * ```
 * Set Prototype Example:
 * ```typescript
 * import "@thalesrc/js-utils/dist/as-proto/set-difference";
 *
 * const base = new Set(["a", "b", "c", "d"]);
 *
 * base.difference(["a", "b"]); // Set(["c", "d"])
 * ```
 * * * *
 * @param base Base Set or Array
 * @param substraction Set or Array to remove its values from the base
 * @param allDiff By default all the same items encountered in substraction will be removed, set this argument as true to get real difference
 * @returns Difference of base from substraction
 */
export function difference<T>(base: T[], substraction: TSubstraction, allDiff?: boolean): T[];
export function difference<T>(base: Set<T>, substraction: TSubstraction, allDiff?: boolean): Set<T>;
export function difference<T>(base: T[] | Set<T>, substraction: TSubstraction, allDiff = false): T[] | Set<T> {
  if (base instanceof Set) {
    return new Set<T>(difference(Array.from(base), substraction));
  }

  const subs: T[] = Array.from(substraction);

  return base.filter(value => {
    const index = subs.indexOf(value);

    if (index > -1 && allDiff) {
      subs.splice(index, 1);
    }

    return index === -1;
  });
}
