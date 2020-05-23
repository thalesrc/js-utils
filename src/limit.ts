import { limit as strLimit } from './string';
import { limit as arrLimit } from './array';

export function limit<T = any>(array: T[], count: number): T[];
export function limit(str: string, count: number): string;
/**
 * #### Limit
 *
 * Limits the string or array to `n` character
 *
 * * * *
 * Example usage:
 * ```typescript
 * import { limit } from "@thalesrc/js-utils";
 *
 * const str = 'foobarbaz';
 * const array = ["a", "b", "c", "d", "e", "f"];
 *
 * limit(str, 3); // 'foo'
 * limit(array, 3); // ["a", "b", "c"]
 * ```
 * * * *
 * @param arrayOrString value to limit
 * @param count Max count
 */
export function limit<T = any>(arrayOrString: T[] | string, count: number): T[] | string {
  if (typeof arrayOrString === 'string') {
    return strLimit(arrayOrString, count);
  }

  if (arrayOrString instanceof Array) {
    return arrLimit(arrayOrString, count);
  }

  throw new Error('Value is not string nor array');
}
