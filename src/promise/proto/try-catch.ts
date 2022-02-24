import { tryCatch } from '../try-catch';

declare global {
  export interface Promise<T> {
    /**
     * #### Promise Try Catch
     *
     * Merges result and error in the same callback
     *
     * * * *
     * Example:
     * ```typescript
     * import "@thalesrc/js-utils/as-proto/promise-try-catch";
     *
     * async function fooFunction() {
     *   const [error, result] = await anAsyncCall().tryCatch();
     *
     *   if (error) {
     *     // handle error
     *   }
     *
     *   // do stuff
     * }
     *
     * ```
     * * * *
     * @param defaultResult Setting this will put the value into the result field when the promise throws error
     */
    tryCatch<E = any>(defaultResult?: T): Promise<[E, T]>;
  }
}

Promise.prototype.tryCatch = function<T, E>(this: Promise<T>, defaultResult: T = null): Promise<[E, T]> {
  return tryCatch<T, E>(this, defaultResult);
};
