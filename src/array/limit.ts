/**
 * #### Limit
 *
 * Returns first `n` children of an array
 *
 * * * *
 * Example:
 * ```typescript
 * import { limit } from "@thalesrc/js-utils/array";
 *
 * const array = ["a", "b", "c", "d", "e", "f"];
 *
 * limit(array, 3); // ["a", "b", "c"]
 * ```
 *
 * Prototype Example:
 * ```typescript
 * import "@thalesrc/js-utils/array/proto/limit";
 *
 * const array = ["a", "b", "c", "d", "e", "f"];
 *
 * array.limit(3); // ["a", "b", "c"]
 * ```
 * * * *
 * @param array: Array to return its children
 * @param count Limiter
 * @return New array
 */
export function limit<T = any>(array: T[], count: number): T[] {
  if (count < 0) {
    count = Number.MAX_SAFE_INTEGER;
  }

  return array.slice(0, count);
}
