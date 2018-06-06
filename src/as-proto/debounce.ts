import { debounce, DEFAULT_DEBOUNCE_TIME } from "../debounce";

declare global {
  export interface Function {
    /**
     * #### Debounces a function that delays invoking until after given time have elapsed since the last time the debounced function was invoked
     *
     * * * *
     * Example usage:
     * ```typescript
     * import "@gen-tech/js-utils/dist/as-proto/debounce";
     *
     * function foo() {
     *   console.log("hello");
     * }
     *
     * for (let i = 0; i < 5; i++) {
     *   foo.debounce();
     * }
     *
     * // logs "hello" only once
     * ```
     * * * *
     * @param [time = 180] Time for debouncing
     * @param [thisObject = null] This object to execute the callback function with
     * @param args Function arguments
     * @return A promise which resolves right after the debouncing sequence has been finished
     */
    debounce(time?: number, thisObject?: any, ...args: any[]): Promise<any>;
  }
}

Function.prototype.debounce = function(time = DEFAULT_DEBOUNCE_TIME, thisObject: any = null, ...args: any[]): Promise<any> {
  return debounce(this, time, thisObject, ...args);
};