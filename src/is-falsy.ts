/**
 * #### Returns whether the entered value is falsy
 *
 * * * *
 * Example usage:
 * ```typescript
 * import { isFalsy } from "@thalesrc/js-utils";
 *
 * isFalsy(undefined); // true
 * isFalsy(true); // false
 * isFalsy([]) // false
 *
 * const falsyValues = ["a", undefined, "b", "", "c"].filter(isFalsy); // [undefined, ""]
 * ```
 * Static usage example:
 * ```typescript
 * import "@thalesrc/js-utils/dist/as-static/is-falsy";
 *
 * Boolean.isFalsy(undefined); // true
 * Boolean.isFalsy(true); // false
 * Boolean.isFalsy([]) // false
 *
 * const falsyValues = ["a", undefined, "b", "", "c"].filter(Boolean.isFalsy); // [undefined, ""]
 * ```
 * * * *
 * @param value value to be checked
 */
export function isFalsy(value: any): boolean {
	return !value;
}
