/**
 * Cloning Options
 */
export interface ICloneOptions {
  /**
   * #### Instance constructors which cloning unwanted
   * Give the instance constructors to prevent them being cloned
   *
   * * * *
   * Example:
   * ```typescript
   * import { clone } from "@gen-tech/js-utils";
   *
   * const object = {
   *   width: 250,
   *   element: document.querySelector("div")
   * };
   *
   * const clonedObject = clone(object, {instancesToRefer: [ HTMLElement ]});
   * // clonedObject.element === object.element
   * ```
   * * * *
   */
  instancesToRefer?: any[];

  /**
   * #### Value filterer to pass same references
   * Being called for each value while cloning. Return true to prevent cloning for the incoming value and pass the same reference instead.
   *
   * * * *
   * Example:
   * ```typescript
   * import { clone } from "@gen-tech/js-utils";
   *
   * const john = { age: 20, willBeReferenced: true };
   * const jane = { age: 25, willBeReferenced: false };
   *
   * const array = [john, jane];
   *
   * const clonedArray = clone(array, {valueFiltererToRefer: person => person.willBeReferenced });
   *
   * // clonedArray[0] === array[0]
   * // clonedArray[1] !== array[1]
   * ```
   * * * *
   * @param value incoming value to be cloned
   * @return Return true to pass same reference
   */
  valueFiltererToRefer?(value: any): boolean;

  /**
   * properties which cloning unwanted
   */
  propsToRefer?: Array<string | symbol>;
};

// TODO: uncomment the code below and delete polyfill when typedoc supports ts@2.8.x
// type TNonOptionalCloneOptions = Required<ICloneOptions>;
type PolyfillRequired<T, TNames extends string> = { [P in TNames]: (T & { [name: string]: never })[P] };
type TNonOptionalCloneOptions = PolyfillRequired<ICloneOptions, keyof ICloneOptions>;

/**
 * #### Deep Clone
 * @param objectToClone Object to clone
 * @param options Clone Options
 */
export function clone<T>(
  objectToClone: T,
  {
    instancesToRefer = [],
    propsToRefer = [],
    valueFiltererToRefer = () => false
  }: ICloneOptions = {}
): T {
  // Pass primitives & functions
	if (objectToClone === null || !(objectToClone instanceof Object) || objectToClone instanceof Function) {
		return objectToClone;
  }

  // Pass unwanted references
	if (instancesToRefer.some(instance => objectToClone instanceof instance)) {
		return objectToClone;
  }

  // Pass filterer results
  if (valueFiltererToRefer(objectToClone)) {
    return objectToClone;
  }

  /**
   * Whole options with defaults
   */
  const allOptions: TNonOptionalCloneOptions = {instancesToRefer, propsToRefer, valueFiltererToRefer};

  // Clone Array
	if (objectToClone instanceof Array) {
    return objectToClone.map(val => clone(val, allOptions)) as any;
  }

  /**
   * New Object Clone
   */
	const _clone = {} as T;

  /**
   * Object cloner
   * @param key incoming property of object to clone
   */
	function cloneObject(key) {
		_clone[key] = clone(objectToClone[key], allOptions);
  }

  const allProperties = [...Object.keys(objectToClone), ...Object.getOwnPropertySymbols(objectToClone)];

  // Pass unwanted props
  allProperties.filter(val => propsToRefer.indexOf(val) > -1).forEach(prop => {
    _clone[prop] = objectToClone[prop];
  });

  // Clone remaining properties
  allProperties.filter(val => propsToRefer.indexOf(val) === -1).forEach(cloneObject);

	return _clone;
}
