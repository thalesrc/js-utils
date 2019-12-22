import { defer } from '../defer';

declare global {
  export interface FunctionConstructor {
    /**
     * #### Delays the execution of the passed function to increase the render performance
     *
     * * * *
     * Example as promise static method
     * ```typescript
     * import "@thalesrc/js-utils/function/static/defer";
     *
     * Function.defer(() => aFunctionToDefer())
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

Function.defer = defer;
