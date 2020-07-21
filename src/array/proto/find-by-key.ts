import { findByKey } from '../find-by-key';

declare global {
  export interface Array<T> {
    /**
     * #### Find By Key
     *
     * Finds an object in an array by matching the value set on the key
     *
     * * * *
     * Example:
     * ```typescript
     * import "@thalesrc/js-utils/array/proto/find-by-key";
     *
     * const array = [{a: 1}, {a: 2}, {a: 3}];
     *
     * array.findByKey("a", 2); // {a: 2}
     * ```
     * * * *
     * @param key Key to search the value on
     * @param value Value to match for the key
     * @return Found object or undefined
     */
    findByKey<K extends keyof T>(key: K, value: T[K]): T;
  }
}

Array.prototype.findByKey = function<T, K extends keyof T>(this: T[], key: K, value: T[K]): T {
  return findByKey(this, key, value);
};
