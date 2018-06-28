import { revertPromise } from "../revert-promise";

declare global {
  export interface Promise<T> {
    /**
     * #### Revert Promise
     *
     * Exchanges resolve state with rejection of a promise
     *
     * * * *
     * Example usage:
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
    revert<U = any>(): Promise<U>;
  }
}

Promise.prototype.revert = function<T = any>(this: Promise<any>): Promise<T> {
  return revertPromise<T>(this);
}
