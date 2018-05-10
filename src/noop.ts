/**
 * #### Noop function
 * * * *
 * Example usage:
 * ```typescript
 * import { noop } from "@gen-tech/js-utils";
 *
 * noop();
 * document.onload = noop;
 * ```
 * Static usage example:
 * ```typescript
 * import "@gen-tech/js-utils/dist/as-static/noop";
 *
 * Function.noop();
 * document.onload = Function.noop;
 * ```
 * * * *
 */
export function noop(): void {}
