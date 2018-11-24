import { minMax } from "../min-max";

declare global {
  export interface Math {
    /**
     * #### Limits the value by given parameters
     *
     * * * *
     * ```typescript
     * import "@thalesrc/js-utils/dist/as-proto/min-max";
     *
     * const limitedValue = Math.minMax(200, 300, Math.random() * 1000);
     * ```
     * * * *
     * @param min minimum limit
     * @param max maximum limit
     * @param value value to limit
     */
    minMax: typeof minMax;
  }
}

Math.minMax = minMax;
