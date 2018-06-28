/**
 * #### Revert Promise
 * Exchanges resolve state with rejection of a promise
 *
 * * * *
 * Example usage:
 * ```typescript
 * import { revertPromise } from "@gen-tech/js-utils";
 *
 * const errorPromise = Promise.reject(new Error('foo'));
 *
 * revertPromise(errorPromise)
 *  .then(err => {
 *    console.log("this will be logged", err);
 *  })
 *  .catch(res => {
 *    console.log("this won't be logged", res);
 *  });
 * ```
 *
 * Proto usage example:
 * ```typescript
 * import "@gen-tech/js-utils/dist/as-proto/promise-revert";
 *
 * Promise.reject(new Error('foo'))
 *  .revert()
 *  .then(err => {
 *    console.log("this will be logged", err);
 *  })
 *  .catch(res => {
 *    console.log("this won't be logged", res);
 *  });
 * ```
 * * * *
 * @param promise The promise to revert its statements
 * @return the reverted promise
 */
export function revertPromise<T = any>(promise: Promise<any>): Promise<T> {
  return promise.then(res => {throw res; }, err => err);
}