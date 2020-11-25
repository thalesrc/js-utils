/**
 * Encapsulates a non array value with an array that contains it unless the value is already an array
 *
 * * * *
 * Example usage:
 * ```typescript
 * import { arrayize } from "@thalesrc/js-utils";
 *
 * const foo = 'foo';
 * const bar = ['bar'];
 * const fooArr = arrayize(foo); // ['foo'];
 * const barArr = arrayize(bar); // ['bar'];
 * ```
 * * * *
 * @param value Array or single value to capsulate
 */
export function arrayize<T>(value: T | T[]): T[] {
  return value instanceof Array ? value : [value];
}
