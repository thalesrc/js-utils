/**
 * #### Async Try Catch
 *
 * Merges result and error in the same callback
 *
 * * * *
 * Example:
 * ```typescript
 * import { asyncTryCatch } "@thalesrc/js-utils";
 *
 * async function fooFunction() {
 *   const promise = anAsyncCall();
 *   const [error, result] = await asyncTryCatch(promise);
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
 * @param promise Promise to try
 * @returns Error and result array
 */
export async function tryCatch<T, E = any>(promise: Promise<T>): Promise<[E, T]> {
  try {
    const result = await promise;
    return [null, result];
  } catch (error) {
    return [error, null];
  }
}
