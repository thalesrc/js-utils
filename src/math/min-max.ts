/**
 * #### Limits the value by specified range
 *
 * * * *
 * Example usage:
 * ```typescript
 * import { minMax } from "@thalesrc/js-utils/math";
 *
 * const limitedValue = minMax(200, 300, Math.random() * 1000);
 * ```
 *
 * Example as Math static:
 * ```typescript
 * import "@thalesrc/js-utils/math/static/min-max";
 *
 * const limitedValue = Math.minMax(200, 300, Math.random() * 1000);
 * ```
 * * * *
 * @param min minimum limit
 * @param max maximum limit
 * @param value value to limit
 * @return the limited value *(returns NaN if an argument is NaN)*
 */
export function minMax(min: number, max: number, value: number): number {
  return Math.max(Math.min(max, value), min);
}
