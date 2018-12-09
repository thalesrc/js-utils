import { SmartMap } from './smart-map';

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
 * import { functionOf } from "@thalesrc/js-utils";
 *
 * const base = [1, 2, 5, {}, "x", "y"];
 * const mapTo = functionOf("thales rocks");
 *
 * const mapped = base.map(mapTo);
 * // ["thales rocks", "thales rocks", "thales rocks", "thales rocks", "thales rocks", "thales rocks"]
 * ```
 * Function Static Example:
 * ```typescript
 * import "@thalesrc/js-utils/dist/as-static/function-of";
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
export function functionOf<T>(returnValue: T): (...args: any[]) => T {
  if (!CACHE.has(returnValue)) {
    CACHE.set(returnValue, function() {return returnValue;});
  }

  return CACHE.get(returnValue);
}