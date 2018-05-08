import { noop } from "./noop";

/**
 * #### Delays the execution of the passed function to increase the render performance
 *
 * * * *
 * Example usage:
 * ```typescript
 * import { defer } from "@gen-tech/js-utils";
 *
 * defer(() => aFunctionToDefer())
 *  .then(res => ...)
 *  .catch(err => ...);
 * ```
 * Example as promise static method
 * ```typescript
 * import "@gen-tech/js-utils/dist/as-static/defer";
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
export function defer<T = any>(callback: () => T = noop as () => T): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      try {
        const returnValue = callback();
        resolve(returnValue);
      } catch (error) {
        reject(error);
      }
    }, 0);
  });
}
