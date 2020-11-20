import { never, NEVER } from '../never';

declare global {
  export interface PromiseConstructor {
    /**
     * Creates a promise which never resolves
     *
     * Example:
     * ```typescript
     * import '@thalesrc/js-utils/promise/static/never';
     *
     * function foo(promise) {
     *   promise = promise || Promise.never();
     *
     *   promise.then(val => {
     *     ...
     *   });
     * }
     * ```
     *
     * @returns the promise which never resolves
     */
    never: typeof never;

    /**
     * A promise which never resolves
     *
     * Example:
     * ```typescript
     * import '@thalesrc/js-utils/promise/static/never';
     *
     * function foo(promise = Promise.NEVER) {
     *   promise.then(val => {
     *     ...
     *   });
     * }
     * ```
     */
    NEVER: typeof NEVER;
  }
}

Promise.never = never;
Promise.NEVER = NEVER;
