const CACHE: {[key: string]: Iterator<string | number>} = {};

/**
 * Unique Id Generator
 * @param  {string} [prefix]
 */
function* uniqueIdGenerator(prefix?: string) {
  let counter = 0;

  while (true) {
    yield prefix ? prefix + '-' + counter++ : counter++;
  }
}

/**
 * #### Generates a unique id
 *
 * Starts a new counter for every unique prefix and if a prefix is given, returns the id by prefixing it, otherwise returns the id as number
 * * * *
 * Example usage:
 * ```typescript
 * import { uniqueId } from "@thalesrc/js-utils";
 *
 * uniqueId(); // 0
 * uniqueId(); // 1
 * uniqueId("some-str"); // "some-str-0";
 * uniqueId("some-str"); // "some-str-1";
 * uniqueId(); // 3
 * ```
 * * * *
 * @param prefix prefix to prepend into the unique id
 * @returns A unique id
 */
export function uniqueId(prefix?: string): string | number {
  if (!prefix || typeof prefix !== 'string') {
    prefix = undefined;
  }

  if (!(prefix in CACHE)) {
    CACHE[prefix] = uniqueIdGenerator(prefix);
  }

  return CACHE[prefix].next().value;
}
