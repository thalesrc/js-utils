/**
 * #### Noop function
 * * * *
 * Example usage:
 * ```typescript
 * import { noop } from "@thalesrc/js-utils/function";
 *
 * noop();
 * document.onload = noop;
 * ```
 * Static usage example:
 * ```typescript
 * import "@thalesrc/js-utils/function/static/noop";
 *
 * Function.noop();
 * document.onload = Function.noop;
 * ```
 * * * *
 */
export function noop(): void {}
