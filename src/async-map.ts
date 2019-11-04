/**
 * #### Async Map
 *
 * Maps an array asynchronously
 *
 * * * *
 * Example:
 * ```typescript
 * import { asyncMap } "@thalesrc/js-utils";
 *
 * const array = [1, 2, 3];
 *
 * asyncMap(array, async value => {
 *  return await addOneAfterASecond(value);
 * }).then(result => {
 *  console.log(result); // [2, 3, 4]
 * });
 * ```
 * * * *
 * @param array Array to map
 * @param mapper Callback async function to map the array
 * @return A promise contains asynchronusly mapped array result
 */
export async function asyncMap<T, U>(array: T[], mapper: (value: T, index: number, array: T[]) => Promise<U>): Promise<U[]> {
  const promises = array.map(mapper);

  return await Promise.all(promises);
}
