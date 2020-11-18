import { OpenPromise } from '../open-promise';

export interface PromiseTimeoutFunction {
  /**
   * @see timeout
   * @param time Time to resolve promise in miliseconds
   * @param value Value to resolve promise with
   * @param key Key to cancel the timeout if needed
   */
  <T = void>(time: number, value?: T, key?: symbol): Promise<T>;

  /**
   * #### Promise Timeout Canceller
   *
   * * * *
   * Usage via promise instance:
   * ```typescript
   * import { timeout } from "@thalesrc/js-utils/promise";
   *
   * const timeout = timeout(1000);
   *
   * timeout
   *  .then(() => console.log("this won't be logged"))
   *  .catch(() => console.log("this will be logged, because timer has been cancelled"));
   *
   * timeout.cancel(timeout);
   * ```
   *
   * Usage via key
   * ```typescript
   * import { timeout } from "@thalesrc/js-utils/promise";
   *
   * const key = Symbol();
   *
   * timeout(1000, null, key)
   *  .then(() => console.log("this won't be logged"))
   *  .catch(() => console.log("this will be logged, because timer has been cancelled"));
   *
   * timeout.cancel(key);
   * ```
   * Static usage example:
   * ```typescript
   * import "@thalesrc/js-utils/promise/static/timeout";
   *
   * const timeout = Promise.timeout(1000);
   *
   * timeout
   *  .then(() => console.log("this won't be logged"))
   *  .catch(() => console.log("this will be logged, because timer has been cancelled"));
   *
   * Promise.timeout.cancel(timeout);
   * ```
   * * * *
   * @param identifier The identifier of the promise to cancel
   * @param error The error which will be throwed by the cancelled promise
   * @returns A promise which resolves if cancelling process is successfull, rejects otherwise
   */
  cancel(identifier: Promise<any> | symbol, error?: any): Promise<void>;

  /**
   * Will be throwed in cancelling promise when the timer has already finished or cancelled
   */
  readonly FINISHED_ALREADY: symbol;

  /**
   * Will be throwed in cancelling promise when the timer has not found via identifier
   */
  readonly IDENTIFIER_NOT_FOUND: symbol;

  /**
   * The default timeout cancelling rejection error
   * Will be throwed when the timer has cancelled
   */
  readonly TIMEOUT_CANCELLED: symbol;
}

interface ITimeoutCache {
  id: number;
  openPromise: OpenPromise;
}

// Defined here for documentation
const promiseTimeoutInitializer = (() => {
  const REFERANCE_CACHE = new WeakMap<Promise<any>, ITimeoutCache>();
  const KEY_CACHE = new Map<symbol, ITimeoutCache>();

  const timeout = <T = void>(time: number, value: T = undefined, key: symbol = undefined): Promise<T> => {
    const openPromise = new OpenPromise<T>();
    const id: any = setTimeout(() => {
      openPromise.resolve(value);
    }, time);

    const cacheObject: ITimeoutCache = {openPromise, id};

    REFERANCE_CACHE.set(openPromise, cacheObject);

    if (key) {
      KEY_CACHE.set(key, cacheObject);
    }

    return openPromise;
  };

  Object.defineProperties(timeout, {
    FINISHED_ALREADY: {
      writable: false,
      value: Symbol('Timeout finished already')
    },
    IDENTIFIER_NOT_FOUND: {
      writable: false,
      value: Symbol('Timeout not found via identifier')
    },
    TIMEOUT_CANCELLED: {
      writable: false,
      value: Symbol('Timeout cancelled')
    }
  });

  (<PromiseTimeoutFunction>timeout).cancel = async (identifier: Promise<any> | symbol, error?: any) => {
    const { FINISHED_ALREADY, IDENTIFIER_NOT_FOUND, TIMEOUT_CANCELLED } = <PromiseTimeoutFunction>timeout;

    if (typeof error === 'undefined') {
      error = TIMEOUT_CANCELLED;
    }

    let cache: ITimeoutCache;

    if (typeof identifier === 'symbol') {
      cache = KEY_CACHE.get(identifier);
    } else {
      cache = REFERANCE_CACHE.get(identifier);
    }

    if (!cache) {
      throw IDENTIFIER_NOT_FOUND;
    }

    if (cache.openPromise.finished) {
      throw FINISHED_ALREADY;
    }

    clearTimeout(cache.id as any);
    cache.openPromise.reject(error);

    if (typeof identifier === 'symbol') {
      KEY_CACHE.delete(identifier);
    }
  };

  return <PromiseTimeoutFunction>timeout;
})();

/**
 * #### Promise Timeout
 * Returns a promise which resolves after given time
 *
 * * * *
 * Example:
 * ```typescript
 * import { timeout } from "@thalesrc/js-utils/promise";
 *
 * timeout(1000);
 *  .then(() => console.log("will be logged after a second"));
 * ```
 * Example with a resolve value:
 * ```typescript
 * import { timeout } from "@thalesrc/js-utils/promise";
 *
 * timeout(1000, "foo");
 *  .then(val => console.log("will log 'foo' after a second", val));
 * ```
 * Can be used in promise chaining:
 * ```typescript
 * import { timeout } from "@thalesrc/js-utils/promise";
 *
 * fetch("http://localhost:8080/anEndpoint") // Fetch something
 *  .then(val => timeout(1000, val)) // Wait a second after response
 *  .then(val => {
 *    ...do something else
 *  });
 * ```
 * Static usage example:
 * ```typescript
 * import "@thalesrc/js-utils/promise/static/timeout";
 *
 * Promise.timeout(1000);
 *  .then(() => console.log("will be logged after a second"));
 * ```
 * * * *
 * @see PromiseTimeoutFunction#cancel for cancelling
 */
export const timeout: PromiseTimeoutFunction = promiseTimeoutInitializer;
