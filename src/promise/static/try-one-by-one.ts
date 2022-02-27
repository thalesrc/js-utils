import { tryOneByOne } from '../try-one-by-one';

declare global {
  export interface PromiseConstructor {
    /**
     * #### Try One By One
     * Tries a set of promises one by one with given order. Breaks the call when a promise resolved. Otherwise keeps trying incoming promises until the list is finished.
     *
     * * * *
     * Example:
     * ```typescript
     * import "@thalesrc/js-utils/promise/static/try-one-by-one";
     *
     * async function fooFunction() {
     *   const foo = await Promise.tryOneByOne([
     *     () => someCall(),
     *     (err) => anotherCall(),
     *     (err) => fooPromise()
     *   ]);
     *
     *   // do stuff
     * }
     * ```
     * * * *
     */
    tryOneByOne: typeof tryOneByOne;
  }
}

Promise.tryOneByOne = tryOneByOne;
