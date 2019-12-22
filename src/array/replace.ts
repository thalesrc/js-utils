/**
 * Replace Items Options Interface
 *
 * @template T typeof the items of the array
 */
export interface ReplaceItemsOptions<T> {
  /**
   * Starting index of the array for replacement operation
   *
   * @default 0
   */
  startingIndex?: number;

  /**
   * Determines how many items will be deleted from the array
   *
   * @default 1
   */
  deleteCount?: number;

  /**
   * Items to replace
   *
   * @default []
   */
  itemsToReplace?: T[];
}

/**
 * Replace by Item Matcher Map Options Interface
 *
 * @template T typeof the items of the array
 */
export interface ReplaceByMapOptions<T> {
  /**
   * Items' Matcher Map to replace
   */
  itemsToReplace: Map<T, T>;

  /**
   * Set as `true` to replace all items in the array if matches with the key of the matcher map while iterating
   *
   * @default false
   */
  multi?: boolean;
}

/**
 * Default Options for Replace Items Mode
 */
const REPLACE_ITEMS_DEFAULT_OPTIONS: Required<ReplaceItemsOptions<any>> = {
  deleteCount: 1,
  itemsToReplace: [],
  startingIndex: 0
};

/**
 * Default Options for Replace By Map Mode
 */
const REPLACE_BY_MAP_DEFAULT_OPTIONS: Required<ReplaceByMapOptions<any>> = {
  itemsToReplace: new Map(),
  multi: false
};

/**
 * #### Replace
 *
 * Replaces an item with passed one of an array
 *
 * * * *
 * Example:
 * ```typescript
 * import { replace } from "@thalesrc/js-utils";
 *
 * const array = ["a", "b", "c", "a", "b", "c"];
 *
 * replace(array, "b", "x"); // ["a", "x", "c", "a", "b", "c"]
 * ```
 * Array Prototype Example:
 * ```typescript
 * import "@thalesrc/js-utils/dist/as-proto/array-replace";
 *
 * const array = ["a", "b", "c", "a", "b", "c"];
 *
 * array.replace("b", "x"); // ["a", "x", "c", "a", "b", "c"]
 * ```
 * * * *
 * @param array Array to replace its item
 * @param itemToRemove Item to remove
 * @param itemToReplace Item to replace with
 * @template T Typeof array items
 * @return New replaced array
 */
export function replace<T>(array: T[], itemToRemove: T, itemToReplace: T): T[];
/**
 * #### Replace
 *
 * Deletes items and replaces new ones from passed starting index of an array
 *
 * * * *
 * Example:
 * ```typescript
 * import { replace } from "@thalesrc/js-utils";
 *
 * const array = ["a", "b", "c", "a", "b", "c"];
 *
 * replace(array, {startingIndex: 3, deleteCount: 1, itemsToReplace: ['x', 'y']}); // ["a", "b", "c", "x", "y", "b", "c"];
 * ```
 * Array Prototype Example:
 * ```typescript
 * import "@thalesrc/js-utils/dist/as-proto/array-replace";
 *
 * const array = ["a", "b", "c", "a", "b", "c"];
 *
 * array.replace({startingIndex: 3, deleteCount: 1, itemsToReplace: ['x', 'y']}); // ["a", "b", "c", "x", "y", "b", "c"];
 * ```
 * * * *
 * @param array Array to replace its item
 * @param replaceOptions Replace options
 * @template T Typeof array items
 * @return New replaced array
 */
export function replace<T>(array: T[], replaceOptions: ReplaceItemsOptions<T>): T[];
/**
 * #### Replace
 *
 * Deletes items and replaces new ones by passed matcher map
 *
 * * * *
 * Example:
 * ```typescript
 * import { replace } from "@thalesrc/js-utils";
 *
 * const array = ["a", "b", "c", "a", "b", "c"];
 * const map = new Map();
 * map.set("a", "x")
 * map.set("b", "y");
 *
 * replace(array, {itemsToReplace: map}); // ["x", "y", "c", "a", "b", "c"];
 * replace(array, {itemsToReplace: map, multi: true}); // ["x", "y", "c", "x", "y", "c"];
 * ```
 * Array Prototype Example:
 * ```typescript
 * import "@thalesrc/js-utils/dist/as-proto/array-replace";
 *
 * const array = ["a", "b", "c", "a", "b", "c"];
 * const map = new Map();
 * map.set("a", "x")
 * map.set("b", "y");
 *
 * array.replace({itemsToReplace: map}); // ["x", "y", "c", "a", "b", "c"];
 * array.replace({itemsToReplace: map, multi: true}); // ["x", "y", "c", "x", "y", "c"];
 * ```
 * * * *
 * @param array Array to replace its item
 * @param replaceOptions Replace options
 * @template T Typeof array items
 * @return New replaced array
 */
export function replace<T>(array: T[], replaceOptions: ReplaceByMapOptions<T>): T[];
export function replace<T>(
  array: T[],
  options: T | ReplaceItemsOptions<T> | ReplaceByMapOptions<T>,
  itemToReplace?: T
): T[] {
  if (arguments.length > 2) {
    options = <ReplaceItemsOptions<T>>{
      startingIndex: array.indexOf(<T>options),
      itemsToReplace: [itemToReplace]
    };
  }

  if ((<ReplaceByMapOptions<T> | ReplaceItemsOptions<T>>options).itemsToReplace instanceof Array) {
    return _replaceItems(array, <ReplaceItemsOptions<T>>options);
  } else {
    return _replaceByMap(array, <ReplaceByMapOptions<T>>options);
  }
}

/**
 * Replace items by 'replace items' mode
 *
 * @param array Array to replace items
 * @param options Replace options
 */
function _replaceItems<T>(array: T[], options: ReplaceItemsOptions<T>): T[] {
  const { startingIndex, deleteCount, itemsToReplace}: Required<ReplaceItemsOptions<T>> = Object.assign({}, REPLACE_ITEMS_DEFAULT_OPTIONS, options);

  const newArray = [...array];

  // If item not found or index number is negative; do nothing
  if (startingIndex < 0) {
    return newArray;
  }

  newArray.splice(startingIndex, deleteCount, ...itemsToReplace);

  return newArray;
}

/**
 * Replace items by 'replace by map' mode
 *
 * @param array Array to replace items
 * @param options Replace options
 */
function _replaceByMap<T>(array: T[], options: ReplaceByMapOptions<T>): T[] {
  const { itemsToReplace, multi }: Required<ReplaceByMapOptions<T>> = Object.assign({}, REPLACE_BY_MAP_DEFAULT_OPTIONS, options);
  const iterationMethod = multi ? Array.prototype.forEach : Array.prototype.some;

  const newArray = [...array];

  itemsToReplace.forEach((value, key) => {
    iterationMethod.call(newArray, (item, index) => {
      const matches = item === key;

      if (matches) {
        newArray.splice(index, 1, value);
      }

      return matches;
    });
  });

  return newArray;
}
