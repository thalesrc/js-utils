/**
 * #### Try One By One
 *
 * Tries a set of promises one by one with given order. Breaks the call when a promise resolved. Otherwise keeps trying incoming promises until the list is finished.
 *
 * * * *
 * Example:
 * ```typescript
 * import { tryOneByOne } from "@thalesrc/js-utils/promise";
 *
 * async function fooFunction() {
 *   const foo = await tryOneByOne([
 *     () => someCall(),
 *     (err) => anotherCall(),
 *     (err) => fooPromise()
 *   ]);
 *
 *   // do stuff
 * }
 *
 * ```
 *
 * Static Example:
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
 *
 * ```
 * * * *
 * @param promises List of promises to try one by one with the order
 * @returns
 */
export async function tryOneByOne<T>(promises: Array<Promise<T> | ((lastError: unknown) => Promise<T>)>): Promise<T> {
   return await tryPromises([...promises], null);
}

async function tryPromises<T>(promises: Array<Promise<T> | ((lastError: unknown) => Promise<T>)>, lastError: unknown): Promise<T> {
  const promiseFn = promises.shift();

  if (!promiseFn) throw lastError;

  try {
    const promise = typeof promiseFn === "function" ? promiseFn(lastError) : promiseFn;

    return await promise;
  } catch (err) {
    return tryPromises(promises, err);
  }
}
