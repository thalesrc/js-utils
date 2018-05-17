import { promiseTimeout, PromiseTimeoutFunction } from "../promise-timeout";

declare global {
  export interface PromiseConstructor {
    /**
     * #### Promise Timeout
     * Returns a promise which resolves after given time
     *
     * * * *
     * Example:
     * ```typescript
     * import "@gen-tech/js-utils/dist/as-static/timeout";
     *
     * Promise.timeout(1000);
     *  .then(() => console.log("will be logged after a second"));
     * ```
     * * * *
     * @see PromiseTimeoutFunction#cancel for cancelling
     */
    timeout: PromiseTimeoutFunction;
  }
}

Promise.timeout = promiseTimeout;
