import { limit } from '../limit';

declare global {
  export interface String {
    /**
     * #### Limit
     *
     * Limits the string to `n` character
     *
     * * * *
     * Example:
     * ```typescript
     * import "@thalesrc/js-utils/string/proto/limit";
     *
     * const str = 'foobarbaz';
     *
     * str.limit(3); // 'foo'
     * ```
     * * * *
     * @param count Count to limit string character size
     * @return Limited string
     */
    limit(count: number): string;
  }
}

String.prototype.limit = function(count: number) {
  return limit(this, count);
};
