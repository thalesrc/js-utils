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
 * import { difference } from "@gen-tech/js-utils";
 *
 * const base = ["a", "b", "c", "d", "a", "b", "c", "d"];
 *
 * difference(base, ["a", "b"]); // ["c", "d", "c", "d"]
 * ```
 * Array Prototype Example:
 * ```typescript
 * import "@gen-tech/js-utils/dist/as-proto/array-difference";
 *
 * const base = ["a", "b", "c", "d", "a", "b", "c", "d"];
 *
 * base.difference(["a", "b"]); // ["c", "d", "c", "d"]
 * ```
 * Set Prototype Example:
 * ```typescript
 * import "@gen-tech/js-utils/dist/as-proto/set-difference";
 *
 * const base = new Set(["a", "b", "c", "d"]);
 *
 * base.difference(["a", "b"]); // Set(["c", "d"])
 * ```
 * * * *
 * @param base Base Set or Array
 * @param substraction Set or Array to remove its values from the base
 * @returns Difference of base from substraction
 */
export function difference<T>(base: T[], substraction: TSubstraction): T[];
export function difference<T>(base: Set<T>, substraction: TSubstraction): Set<T>;
export function difference<T>(base: T[] | Set<T>, substraction: TSubstraction): T[] | Set<T> {
  if (base instanceof Set) {
    return new Set<T>(difference(Array.from(base), substraction));
  }

  const subs: T[] = Array.from(substraction);
  return base.filter(value => subs.indexOf(value) === -1);
}
