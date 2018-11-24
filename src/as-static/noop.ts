import { noop } from "../noop";

declare global {
  export interface FunctionConstructor {
    /**
     * #### Noop function
     * * * *
     * Static usage example:
     * ```typescript
     * import "@thalesrc/js-utils/dist/as-static/noop";
     *
     * Function.noop();
     * document.onload = Function.noop;
     * ```
     * * * *
     */
    noop: typeof noop;
  }
}

Function.noop = noop;
