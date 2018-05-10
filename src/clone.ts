/**
 * Cloning Options
 */
export interface ICloneOptions {
  /**
   * instance constructors which cloning unwanted
   */
  instancesToRefer?: any[];

  /**
   *
   * @param value incoming value to be cloned
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
	if (!(objectToClone instanceof Object) || objectToClone instanceof Function) {
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

  // Pass unwanted props
  propsToRefer.forEach(prop => {
    _clone[prop] = objectToClone[prop];
  });

  /**
   * Object cloner
   * @param key incoming property of object to clone
   */
	function cloneObject(key) {
		_clone[key] = clone(objectToClone[key], allOptions);
	}

  // Clone remaining properties
  [...Object.keys(objectToClone), ...Object.getOwnPropertySymbols(objectToClone)]
    .filter(val => propsToRefer.indexOf(val) > -1)
    .forEach(cloneObject);

	return _clone;
}
