/**
 * #### Limits the value by given parameters
 *
 * * * *
 * Example usage:
 * ```typescript
 * import { minMax } from "@gen-tech/js-utils";
 *
 * const limitedValue = minMax(200, 300, Math.random() * 1000);
 * ```
 *
 * Example as Math static:
 * ```typescript
 * import "@gen-tech/js-utils/dist/as-static/min-max";
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
