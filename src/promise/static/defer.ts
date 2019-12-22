import { defer } from "../defer";

declare global {
  export interface PromiseConstructor {
    /**
     * #### Delays the execution of the passed function to increase the render performance
     *
     * * * *
     * Example as promise static method
     * ```typescript
     * import "@thalesrc/js-utils/dist/as-static/defer";
     *
     * Promise.defer(() => aFunctionToDefer())
     *  .then(res => ...)
     *  .catch(err => ...);
     * ```
     * * * *
     * @param callback Callback function to be executed
     * @typeparam T type of the return value of the callback
     * @returns A promise which resolves with the value of the callback right after the execution
     */
    defer: typeof defer;
  }
}

Promise.defer = defer;
