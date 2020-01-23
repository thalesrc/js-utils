import { noop } from '../function';

const UNKNOWN = Symbol('Unknown');
const CLONING_IN_PROGRESS = Symbol('Cloning In Progress');
const TO_BE_FINALIZED = Symbol('To Be Finalized');
const INTERNALS = Symbol('Internals');

const CONSTRUCTABLE_TYPES = [
  Date, Number, String, Boolean, BigInt, RegExp,
  Int8Array,  Uint8Array,  Uint8ClampedArray,  Int16Array,  Uint16Array,  Int32Array,  Uint32Array,  Float32Array,  Float64Array,  BigInt64Array,  BigUint64Array
];
const OBJECTS_TO_KEEP = [
  Math, JSON, Reflect, Intl // TODO: add WebAssembly
];


interface CloningObjectData<T> {
  parent?: unknown;
  key?: unknown;
  value: T;
}

class Strategy {
  public mode: 'sync' | 'async' = 'sync';
  public clone: (this: Strategy) => any = noop;

  constructor(async = false) {
    if (async) {
      this.mode = 'async';
    }
  }
}

class StrategyData {
  private readonly [INTERNALS]: InternalData;

  constructor(
    public parent: any,
    public key: any,
    public value: any,
    internals: InternalData
  ) {
    this[INTERNALS] = internals;
  }

  public readonly keepSame = () => {
    const strategy = new Strategy();

    strategy.clone = () => this.value;

    return strategy;
  }

  public readonly syncClone = (
    customCloner: (cloner: <T>(data: CloningObjectData<T>) => T) => any
  ) => {
    const strategy = new Strategy();

    strategy.clone = () => customCloner(
      ({parent = UNKNOWN, key = UNKNOWN, value}) => cloner({parent, key, value}, this[INTERNALS])
    );

    return strategy;
  }

  public readonly asyncClone = (
    customCloner: (cloner: <T>(data: CloningObjectData<T>) => Promise<T>) => any
  ) => {
    const strategy = new Strategy(true);

    strategy.clone = () => customCloner(
      ({parent = UNKNOWN, key = UNKNOWN, value}) => asyncCloner({parent, key, value}, this[INTERNALS])
    );

    return strategy;
  }
}

class InternalData {
  public readonly finalizers: Array<CloningObjectData<any>> = [];
  public readonly clonedObjects = new WeakMap();

  constructor(
    public readonly customStrategy: (data: StrategyData) => Strategy | void,
    public readonly customFinalizer: (parent: any, key: any, value: any) => ((result: any) => void) | void
  ) {}
}

export function clone<T>(
  object: T,
  strategy: (data: StrategyData) => Strategy | void = noop,
  finalizer: (parent: any, key: any, value: any) => ((result: any) => void) | void = noop
): T {
  const internalData = new InternalData(strategy, finalizer);

  const clonedObject = cloner({value: object, parent: UNKNOWN, key: UNKNOWN}, internalData);

  for (const {value, key, parent} of internalData.finalizers) {
    let finalizerFunction = finalizer(parent, key, value) as (result: any) => void;

    if (typeof finalizerFunction !== 'function') {
      finalizerFunction = builtInFinalizerFunction(parent, key, value) as (result: any) => void;
    }

    finalizerFunction(internalData.clonedObjects.get(value));
  }

  return clonedObject as T;
}

export async function asyncClone<T>(
  object: T,
  strategy: (data: StrategyData) => Strategy | void = noop,
  finalizer: (parent: any, key: any, value: any) => ((result: any) => void) | void = noop
): Promise<T> {
  const internalData = new InternalData(strategy, finalizer);
  const clonedObject = await asyncCloner({value: object, parent: UNKNOWN, key: UNKNOWN}, internalData);

  for (const {value, key, parent} of internalData.finalizers) {
    let finalizerFunction = finalizer(parent, key, value) as (result: any) => void;

    if (typeof finalizerFunction !== 'function') {
      finalizerFunction = builtInFinalizerFunction(parent, key, value) as (result: any) => void;
    }

    finalizerFunction(internalData.clonedObjects.get(value));
  }

  return clonedObject as T;
}

function cloner<T>(
  {value, key, parent}: CloningObjectData<T>,
  internals: InternalData
): T {
  const strategyData = new StrategyData(parent, key, value, internals);
  const { clonedObjects, finalizers, customStrategy } = internals;

  let strategy: Strategy = customStrategy(strategyData) as Strategy;

  if (!(strategy instanceof Strategy)) {
    strategy = builtInStrategyFunction(strategyData);
  }

  // If cloned before, skip circular cloning
  if (clonedObjects.has(value as any)) {
    if (clonedObjects.get(value as any) === CLONING_IN_PROGRESS) {
      finalizers.push({value, key, parent});

      return TO_BE_FINALIZED as any;
    }

    return clonedObjects.get(value as any);
  }

  // Mark object as cloning
  try {
    clonedObjects.set(value as any, CLONING_IN_PROGRESS);
  } catch {}

  // Clone
  const result = strategy.clone();

  // Register
  try {
    clonedObjects.set(value as any, result);
  } catch {}

  // Return result
  return result;
}

async function asyncCloner<T>(
  {value, key, parent}: CloningObjectData<T>,
  internals: InternalData
): Promise<T> {
  const strategyData = new StrategyData(parent, key, value, internals);
  const { clonedObjects, finalizers, customStrategy } = internals;

  let strategy: Strategy = customStrategy(strategyData) as Strategy;

  if (!(strategy instanceof Strategy)) {
    strategy = builtInAsyncStrategyFunction(strategyData);
  }

  // If cloned before, skip circular cloning
  if (clonedObjects.has(value as any)) {
    if (clonedObjects.get(value as any) === CLONING_IN_PROGRESS) {
      finalizers.push({value, key, parent});

      return TO_BE_FINALIZED as any;
    }

    return clonedObjects.get(value as any);
  }

  // Mark object as cloning
  try {
    clonedObjects.set(value as any, CLONING_IN_PROGRESS);
  } catch {}

  // Clone
  let result: T;

  if (strategy.mode === 'async') {
    result = await strategy.clone();
  } else {
    result = strategy.clone();
  }

  // Register
  try {
    clonedObjects.set(value as any, result);
  } catch {}

  // Return result
  return result;
}

function builtInStrategyFunction({value, syncClone, keepSame}: StrategyData): Strategy {
  if (value === null || !(value instanceof Object) || value instanceof Function) {
    return keepSame();
  }

  if (value instanceof Array) {
    return syncClone(arrayCloner(value));
  }

  if (value instanceof Set) {
    return syncClone(setCloner(value));
  }

  if (value instanceof Map) {
    return syncClone(mapCloner(value));
  }

  if (value instanceof WeakMap || value instanceof WeakSet) {
    return keepSame();
  }

  if (OBJECTS_TO_KEEP.some(object => object === value)) {
    return keepSame();
  }

  if (CONSTRUCTABLE_TYPES.some(type => value instanceof type)) {
    return syncClone(() => new value.constructor(value));
  }

  return syncClone(objectCloner(value));
}

function builtInAsyncStrategyFunction({value, asyncClone, keepSame}: StrategyData): Strategy {
  if (value === null || !(value instanceof Object) || value instanceof Function) {
    return keepSame();
  }

  if (value instanceof Array) {
    return asyncClone(arrayCloner(value));
  }

  if (value instanceof Set) {
    return asyncClone(setCloner(value));
  }

  if (value instanceof Map) {
    return asyncClone(mapCloner(value));
  }

  if (value instanceof WeakMap || value instanceof WeakSet) {
    return keepSame();
  }

  if (OBJECTS_TO_KEEP.some(object => object === value)) {
    return keepSame();
  }

  if (CONSTRUCTABLE_TYPES.some(type => value instanceof type)) {
    return asyncClone(() => new value.constructor(value));
  }

  return asyncClone(objectCloner(value));
}

function builtInFinalizerFunction(parent: any, key: any, value: any): ((result: any) => void) | void {
  if (parent instanceof Set) {
    return result => {
      parent.delete(TO_BE_FINALIZED);
      parent.add(result);
    };
  }

  if (parent instanceof Map) {
    return result => {
      parent.set(key, result);
    };
  }

  if (parent instanceof Object) {
    return result => {
      parent[key] = result;
    };
  }
}

function arrayCloner<T = any>(value: T[]): (cloner: (data: CloningObjectData<T>) => T) => T[] {
  return cloner => {
    const newArray = [];

    for (const [k, v] of value.entries()) {
      newArray[k] = cloner({parent: newArray, key: k, value: v});
    }

    return newArray;
  };
}

function setCloner<T>(value: Set<T>): (cloner: (data: CloningObjectData<T>) => T) => Set<T> {
  return cloner => {
    const newSet = new Set<T>();

    for (const v of value) {
      newSet.add(cloner({value: v, parent: newSet}));
    }

    return newSet;
  };
}

function mapCloner<T>(value: Map<any, T>): (cloner: (data: CloningObjectData<T>) => T) => Map<any, T> {
  return cloner => {
    const newMap = new Map();

    for (const [k, v] of value.entries()) {
      newMap.set(k, cloner({value: v, parent: newMap, key: k}));
    }

    return newMap;
  };
}

function objectCloner<T>(value: {[key: string]: T}): (cloner: (data: CloningObjectData<T>) => T) => {[key: string]: T} {
  return cloner => {
    const newObject = {};

    for (const k of Reflect.ownKeys(value)) {
      newObject[k] = cloner({value: value[k as string], key: k, parent: newObject});
    }

    return newObject;
  };
}
