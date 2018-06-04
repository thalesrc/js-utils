import { promiseTimeout } from "./promise-timeout";
import { OpenPromise } from './open-promise';

export type TDebounceFunction<T> = (...args: any[]) => (T | Promise<T>);

interface ICacheObject {
  timeout: Promise<any>;
  promise: OpenPromise;
}

const DEFAULT_DEBOUNCE_TIME = 180;
const KEY_REFERENCES = new Map<Function, symbol>();
const CACHE = new Map<symbol, ICacheObject>();

export function debounceWithKey<T>(
  key: symbol,
  callback: TDebounceFunction<T>,
  time = DEFAULT_DEBOUNCE_TIME,
  thisObject: any = null,
  ...args: any[]
): Promise<T> {
  let timeout: Promise<any>;
  let promise: OpenPromise;

  if (CACHE.has(key)) {
    const stocked = CACHE.get(key);
    timeout = stocked.timeout;
    promise = stocked.promise;
    promiseTimeout.cancel(timeout);
  } else {
    promise = new OpenPromise();
  }

  timeout = promiseTimeout(time);
  CACHE.set(key, {promise, timeout});

  timeout
    .then(() => {
      CACHE.delete(key);
      const result = callback.call(thisObject, args);
      promise.bindPromise(result);
      return result;
    })
    .catch(err => {
      if (err !== promiseTimeout.TIMEOUT_CANCELLED) {
        throw err;
      }
    });

  return promise.promise;
}

export function debounce<T>(
  callback: TDebounceFunction<T>,
  time = DEFAULT_DEBOUNCE_TIME,
  thisObject: any = null,
  ...args: any[]
): Promise<T> {
  if (!KEY_REFERENCES.has(callback)) {
    KEY_REFERENCES.set(callback, Symbol());
  }

  return debounceWithKey(KEY_REFERENCES.get(callback), callback, time, thisObject, ...args);
}
