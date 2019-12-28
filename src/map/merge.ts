/**
 * #### Map Merge
 *
 * Merges two maps
 *
 * * * *
 * Example usage:
 * ```typescript
 * import { merge } from "@thalesrc/js-utils/map";
 *
 * const first = new Map();
 * first.set("a", 1);
 *
 * const second = new Map();
 * second.set("b", 2);
 *
 * merge(first, second); // [{key: "a", value: 1}, {key: "b", value: 2}]
 * ```
 * * * *
 * @param first First map
 * @param second Second map
 * @returns A new merged map
 */
export function merge<T, U, V, Y>(first: Map<T, U>, second: Map<V, Y>): Map<T | V, U | Y> {
  const newMap = new Map<T | V, U | Y>(first);

  for (const key of second.keys()) {
    newMap.set(key, second.get(key));
  }

  return newMap;
}
