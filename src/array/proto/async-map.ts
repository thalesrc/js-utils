import { asyncMap } from '../async-map';

declare global {
  export interface Array<T> {
    /**
     * #### Async Map
     *
     * Maps an array asynchronously
     *
     * * * *
     * Example:
     * ```typescript
     * import "@thalesrc/js-utils/as-proto/array-async-map";
     *
     * const array = [1, 2, 3];
     *
     * const mapped = await array.asyncMap(async value => await addOneAfterASecond(value)); // [2, 3, 4]
     *
     * ```
     * * * *
     * @param mapper Callback async function to map the array
     * @return A promise contains asynchronusly mapped array result
     */
    asyncMap<U>(callbackFn: (value: T, index: number, array: T[]) => Promise<U>): Promise<U[]>;
  }
}

Array.prototype.asyncMap = async function<T, U>(this: T[], callbackFn: (value: T, index: number, array: T[]) => Promise<U>): Promise<U[]> {
  return await asyncMap(this, callbackFn);
};
