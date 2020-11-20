import { noop } from '../function/noop';

/**
 * A promise which never resolves
 *
 * Example:
 * ```typescript
 * import { NEVER } from '@thalesrc/js-utils/promise';
 *
 * function foo(promise = NEVER) {
 *   promise.then(val => {
 *     ...
 *   });
 * }
 * ```
 */
export const NEVER = new Promise(noop);

/**
 * Creates a promise which never resolves
 *
 * Example:
 * ```typescript
 * import { never } from '@thalesrc/js-utils/promise';
 *
 * function foo(promise) {
 *   promise = promise || never();
 *
 *   promise.then(val => {
 *     ...
 *   });
 * }
 * ```
 *
 * @returns the promise which never resolves
 */
export function never(): Promise<unknown> {
  return NEVER;
}
