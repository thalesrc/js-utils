/**
 * Limits the value
 * @param  {number} min minimum limit
 * @param  {number} max maximum limit
 * @param  {number} value value to limit
 * @returns number
 */
export function minMax(min: number, max: number, value: number): number {
  return Math.max(Math.min(max, value), min);
}
