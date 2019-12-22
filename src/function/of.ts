import { SmartMap } from '../smart-map';

/**
 * Cache object to store previously created functions
 */
const CACHE = new SmartMap<any, () => any>();

/**
 * ### Function Of
 *
 * Creates a function which returns the value given
 *
 * * * *
 * Example:
 * ```typescript
 * import { of } from "@thalesrc/js-utils/function";
 *
 * const base = [1, 2, 5, {}, "x", "y"];
 * const mapTo = of("thales rocks");
 *
 * const mapped = base.map(mapTo);
 * // ["thales rocks", "thales rocks", "thales rocks", "thales rocks", "thales rocks", "thales rocks"]
 * ```
 * Function Static Example:
 * ```typescript
 * import "@thalesrc/js-utils/function/static/of";
 *
 * const base = [1, 2, 5, {}, "x", "y"];
 * const mapTo = Function.of("thales rocks");
 *
 * const mapped = base.map(mapTo);
 * // ["thales rocks", "thales rocks", "thales rocks", "thales rocks", "thales rocks", "thales rocks"]
 * ```
 * * * *
 * @param returnValue The value which created function returns
 * @returns A function which returns the `returnValue`
 */
export function of<T>(returnValue: T): (...args: any[]) => T {
  if (!CACHE.has(returnValue)) {
    CACHE.set(returnValue, function() {return returnValue; });
  }

  return CACHE.get(returnValue);
}
