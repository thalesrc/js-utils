/**
 * Returns whether the entered value is falsy
 *
 * Example usage:
 * ```typescript
 * import { isFalsy } from "@gen-tech/js-utils";
 *
 * isFalsy(undefined); // true
 * isFalsy(true); // false
 * isFalsy([]) // false
 *
 * const falsyValues = ["a", undefined, "b", "", "c"].filter(isFalsy); // [undefined, ""]
 * ```
 * @param value value to be checked
 */
export function isFalsy(value: boolean): boolean {
	return !value;
}
