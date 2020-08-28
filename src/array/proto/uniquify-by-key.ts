import { uniquifyByKey } from '../uniquify-by-key';

declare global {
  export interface Array<T> {
    /**
     * #### Uniquify By Key
     *
     * Removes objects from the array which the value of its specifed key included before by another
     *
     * * * *
     * Example:
     * ```typescript
     * import "@thalesrc/js-utils/array/proto/uniquify-by-key";
     *
     * const array = [{a: 1}, {a: 1}, {a: 2}, {a: 3}, {a: 3}, {a: 4}];
     *
     * array.uniquifyByKey('a'); // [{a: 1}, {a: 2}, {a: 3}, {a: 4}]
     * ```
     * * * *
     * @param key Key to search the value on
     * @return The new uniquified array
     */
    uniquifyByKey(key: keyof T): typeof uniquifyByKey;
  }
}

Array.prototype.uniquifyByKey = <any>function<T>(this: T[], key: keyof T): T[] {
  return uniquifyByKey(this, key);
};
