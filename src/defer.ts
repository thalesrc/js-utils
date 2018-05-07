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
 * * * *
 * @param callback Callback function to be executed
 * @typeparam T type of the return value of the callback
 * @returns A promise which resolves with the value of the callback right after the execution
 */
export function defer<T = any>(callback: () => T): Promise<T> {
  return new Promise<T>(resolve => {
    setTimeout(() => {
      resolve(callback());
    }, 0);
  });
}
