import { OpenPromise } from "./open-promise";

export interface PromiseTimeoutFunction {
  /**
   * @param time Time to resolve promise in miliseconds
   * @param value Value to resolve promise with
   * @param key Key to cancel the timeout if needed
   */
  <T = void>(time: number, value?: T, key?: symbol): Promise<T>;

  /**
   * #### Promise Timeout Canceller
   * @param identifier The identifier of the promise to cancel
   * @param error The error which will be throwed by the cancelled promise
   */
  cancel(identifier: Promise<any> | symbol, error?: any): Promise<void>;
  readonly FINISHED_ALREADY: symbol;
  readonly IDENTIFIER_NOT_FOUND: symbol;
  readonly TIMEOUT_CANCELLED: symbol;
}

interface ITimeoutCache {
  id: number;
  openPromise: OpenPromise;
}

/**
 * #### Timeout Promise
 * Returns a promise which resolves after given time
 */
export const promiseTimeout: PromiseTimeoutFunction = (() => {
  const REFERANCE_CACHE = new WeakMap<Promise<any>, ITimeoutCache>();
  const KEY_CACHE = new Map<symbol, ITimeoutCache>();

  const timeout = <T = void>(time: number, value: T = undefined, key: symbol = undefined) => {
    const openPromise = new OpenPromise<T>();
    const id: any = setTimeout(() => {
      openPromise.resolve(value);
    }, time);

    const cacheObject: ITimeoutCache = {openPromise, id};

    REFERANCE_CACHE.set(openPromise.promise, cacheObject);

    if (key) {
      KEY_CACHE.set(key, cacheObject);
    }

    return openPromise.promise;
  };

  Object.defineProperties(timeout, {
    FINISHED_ALREADY: {
      writable: false,
      value: Symbol("Timeout finished already")
    },
    IDENTIFIER_NOT_FOUND: {
      writable: false,
      value: Symbol("Timeout not found via identifier")
    },
    TIMEOUT_CANCELLED: {
      writable: false,
      value: Symbol("Timeout cancelled")
    }
  });

  (<PromiseTimeoutFunction>timeout).cancel = async (identifier: Promise<any> | symbol, error?: any) => {
    const { FINISHED_ALREADY, IDENTIFIER_NOT_FOUND, TIMEOUT_CANCELLED } = <PromiseTimeoutFunction>timeout;

    if (typeof error === "undefined") {
      error = TIMEOUT_CANCELLED;
    }

    let cache: ITimeoutCache;

    if (typeof identifier === "symbol") {
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

    clearTimeout(cache.id);
    cache.openPromise.reject(error);

    if (typeof identifier === "symbol") {
      KEY_CACHE.delete(identifier);
    }
  };

  return <PromiseTimeoutFunction>timeout;
})();
