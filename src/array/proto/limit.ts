import { limit } from '../limit';

declare global {
  export interface Array<T> {
    /**
     * #### Limit
     *
     * Returns first `n` children of an array
     *
     * * * *
     * Example:
     * ```typescript
     * import "@thalesrc/js-utils/array/proto/limit";
     *
     * const array = ["a", "b", "c", "d", "e", "f"];
     *
     * array.limit(3); // ["a", "b", "c"]
     * ```
     * * * *
     * @param count Limiter
     * @return New array
     */
    limit(count: number): T[];
  }
}

Array.prototype.limit = function(count: number) {
  return limit(this, count);
};
