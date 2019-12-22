import { noop } from './noop';

/**
 * #### Delays the execution of the passed function to increase the render performance
 *
 * * * *
 * Example usage:
 * ```typescript
 * import { defer } from "@thalesrc/js-utils/function";
 *
 * defer(() => aFunctionToDefer())
 *  .then(res => ...)
 *  .catch(err => ...);
 * ```
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
