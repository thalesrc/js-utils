/**
 * Delays the execution of the passed function to increase the render performance
 * @param callback Callback function to be executed
 */
export function defer<T = any>(callback: () => T): Promise<T> {
  return new Promise<T>(resolve => {
    setTimeout(() => {
      resolve(callback());
    }, 0);
  });
}
