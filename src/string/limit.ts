import { limit as arrLimit } from '../array/limit';

/**
 * #### Limit
 *
 * Limits the string to `n` character
 *
 * * * *
 * Example:
 * ```typescript
 * import { limit } from "@thalesrc/js-utils/string";
 *
 * const str = 'foobarbaz';
 *
 * limit(str, 3); // 'foo'
 * ```
 *
 * Prototype Example:
 * ```typescript
 * import "@thalesrc/js-utils/string/proto/limit";
 *
 * const str = 'foobarbaz';
 *
 * str.limit(3); // 'foo'
 * ```
 * * * *
 * @param str: String to limit
 * @param count Count to limit string character size
 * @return Limited string
 */
export function limit(str: string, count: number): string {
  return arrLimit(str.split(''), count).join('');
}
