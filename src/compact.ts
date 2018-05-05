const FALSY_VALUES = [undefined, null, "", 0, false];

/**
 * Filters falsy values of the given array
 *
 * __Does not modify the original array__
 *
 * Values to be filtered: `[undefined, null, "", 0, false, NaN]`
 *
 * @param  {T[]} arrayToCompact array to compact
 * @template T the type of the arrayToCompact
 * @returns T[] filtered array
 */
export function compact<T = any>(arrayToCompact: T[]): T[] {
	return arrayToCompact.filter((item: any) => !Number.isNaN(item) && FALSY_VALUES.every(value => item !== value));
}
