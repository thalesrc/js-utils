/**
 * #### Returns whether the entered value is truthy
 *
 * * * *
 * Example usage:
 * ```typescript
 * import { isTruthy } from "@thalesrc/js-utils";
 *
 * isTruthy(undefined); // false
 * isTruthy(true); // true
 * isTruthy([]) // true
 *
 * const truthyValues = ["a", undefined, "b", "", "c"].filter(isTruthy); // ["a", "b", "c"]
 * ```
 * Static usage example:
 * ```typescript
 * import "@thalesrc/js-utils/dist/as-static/is-truthy";
 *
 * Boolean.isTruthy(undefined); // false
 * Boolean.isTruthy(true); // true
 * Boolean.isTruthy([]) // true
 *
 * const truthyValues = ["a", undefined, "b", "", "c"].filter(Boolean.isTruthy); // ["a", "b", "c"]
 * ```
 * * * *
 * @param value value to be checked
 */
export function isTruthy(value: any): boolean {
	return !!value;
}
