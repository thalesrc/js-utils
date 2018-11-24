/**
 * #### Noop function
 * * * *
 * Example usage:
 * ```typescript
 * import { noop } from "@thalesrc/js-utils";
 *
 * noop();
 * document.onload = noop;
 * ```
 * Static usage example:
 * ```typescript
 * import "@thalesrc/js-utils/dist/as-static/noop";
 *
 * Function.noop();
 * document.onload = Function.noop;
 * ```
 * * * *
 */
export function noop(): void {}
