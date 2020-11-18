# @thalesrc/js-utils
Javascript utility functions for web development

[![travis](https://travis-ci.org/thalesrc/js-utils.svg)](https://travis-ci.org/thalesrc/js-utils)
[![codecov](https://codecov.io/gh/thalesrc/js-utils/branch/master/graph/badge.svg)](https://codecov.io/gh/thalesrc/js-utils)
[![npm](https://img.shields.io/npm/v/@thalesrc/js-utils.svg)](https://www.npmjs.com/package/@thalesrc/js-utils)
[![npm](https://img.shields.io/npm/dw/@thalesrc/js-utils.svg)](https://www.npmjs.com/package/@thalesrc/js-utils)
[![TypeScript](https://badges.frapsoft.com/typescript/version/typescript-next.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![npm](https://img.shields.io/npm/l/@thalesrc/js-utils.svg)](https://github.com/thalesrc/js-utils/blob/master/LICENSE)
[![Join the chat at https://gitter.im/thalesrc_js-utils/Lobby](https://badges.gitter.im/thalesrc_js-utils/Lobby.svg)](https://gitter.im/thalesrc_js-utils/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Motivation

Collecting commonly used utility functions in a package.

## Goals

* Typescript support
* Tree-shaking
* No dependencies
* High performance
* Documentation
* Well tested
* Static/Prototype method support

## Installation
* npm: `npm install @thalesrc/js-utils --save`
* yarn: `yarn add @thalesrc/js-utils`

## Documentation

See: [thalesrc.github.io/js-utils](https://thalesrc.github.io/js-utils)

## Functions

### Array

#### [Async Map](https://thalesrc.github.io/js-utils/modules/_array_async_map_.html)
Maps an array asynchronously

```typescript
import { asyncMap } "@thalesrc/js-utils/array";

const array = [1, 2, 3];

const result = await asyncMap(array, async value => {
 return await addOneAfterASecond(value);
});

console.log(result); // [2, 3, 4]
```

#### [Compact](https://thalesrc.github.io/js-utils/modules/_array_compact_.html)
Filters falsy values of an array

```typescript
import { compact } from "@thalesrc/js-utils/array";

const arr = [undefined, "", false, 0, 1, "1", null];
const compacted = compact(arr); // [1, "1"];
```

#### [Difference](https://thalesrc.github.io/js-utils/modules/_array_difference_.html)
Gets the difference of the two arrays or sets

```typescript
import { difference } from "@thalesrc/js-utils/array";

const base = ["a", "b", "c", "d", "a", "b", "c", "d"];

difference(base, ["a", "b"]); // ["c", "d", "c", "d"]
difference(base, ["a", "b"], true); // ["c", "d", "a", "b", "c", "d"]
```

#### [Find By Key](https://thalesrc.github.io/js-utils/modules/_array_find_by_key_.html)
Finds an object in an array by matching the value set on the key

```typescript
import { findByKey } from "@thalesrc/js-utils/array";

const array = [{a: 1}, {a: 2}, {a: 3}];

findByKey(array, "a", 2); // {a: 2}
```

#### [Intersection](https://thalesrc.github.io/js-utils/modules/_array_intersection_.html)
Gets the intersection of the two arrays or sets

```typescript
import { intersection } from "@thalesrc/js-utils/array";

const base = ["a", "b", "c", "d", "a", "b", "c", "d"];

intersection(base, ["a", "b", "x"]); // ["a", "b", "a", "b"]
intersection(base, ["a", "b", "x"], false); // ["a", "b"]
```

#### [Limit](https://thalesrc.github.io/js-utils/modules/_array_limit_.html)
Returns first `n` children of an array

```typescript
import { limit } from "@thalesrc/js-utils/array";

const array = ["a", "b", "c", "d", "e", "f"];

limit(array, 3); // ["a", "b", "c"]
```

#### [Remove](https://thalesrc.github.io/js-utils/modules/_array_remove_.html)
Removes an item from an array

```typescript
import { remove } from "@thalesrc/js-utils/array";

const array = ["a", "b", "c", "a", "b", "c"];

remove(array, "b"); // ["a", "c", "a", "b", "c"]
remove(array, "b", true); // ["a", "c", "a", "c"]
```

#### [Replace](https://thalesrc.github.io/js-utils/modules/_array_replace_.html)
Replaces an item with passed one of an array

```typescript
import { replace } from "@thalesrc/js-utils/array";

const array = ["a", "b", "c", "a", "b", "c"];

replace(array, "b", "x"); // ["a", "x", "c", "a", "b", "c"]
replace(array, {startingIndex: 3, deleteCount: 1, itemsToReplace: ['x', 'y']}); // ["a", "b", "c", "x", "y", "b", "c"];

const config = new Map();
config.set("a", "x")
config.set("b", "y");

replace(array, {itemsToReplace: config}); // ["x", "y", "c", "a", "b", "c"];
replace(array, {itemsToReplace: config, multi: true}); // ["x", "y", "c", "x", "y", "c"];
```

#### [Uniquify](https://thalesrc.github.io/js-utils/modules/_array_uniquify_.html)
Removes repeated items from the array

```typescript
import { uniquify } "@thalesrc/js-utils/array";

const array = ["a", "b", "c", "a", "b", "c"];

uniquify(array); // ["a", "b", "c"]
```

#### [Uniquify By Key](https://thalesrc.github.io/js-utils/modules/_array_uniquify_by_key_.html)
Removes objects from the array which the value of its specifed key included before by another

```typescript
import { uniquifyByKey } "@thalesrc/js-utils/array";

const array = [{a: 1}, {a: 1}, {a: 2}, {a: 3}, {a: 3}, {a: 4}];

uniquifyByKey(array, 'a'); // [{a: 1}, {a: 2}, {a: 3}, {a: 4}]
```

### Function

#### [Debounce](https://thalesrc.github.io/js-utils/modules/_function_debounce_.html)
Debounces a function that delays invoking until after configured time have elapsed since the last time the debounced function was invoked

```typescript
import { debounce } from "@thalesrc/js-utils/promise";

function foo() {
  console.log("hello");
}

for (let i = 0; i < 10; i++) {
  debounce(foo);
}

// logs "hello" only once
```

#### [Defer](https://thalesrc.github.io/js-utils/modules/_function_defer_.html)
Delays the execution of the passed function

```typescript
import { defer } from "@thalesrc/js-utils/function";

const result = await defer(() => aFunctionToDeferThatReturnsHello());

console.log(result); // 'hello'
```

#### [Noop](https://thalesrc.github.io/js-utils/modules/_function_noop_.html)
Noop function

```typescript
import { noop } from "@thalesrc/js-utils/function";

noop();
```

#### [Of](https://thalesrc.github.io/js-utils/modules/_function_of_.html)
Creates a function which returns the specified value

```typescript
import { of } from "@thalesrc/js-utils/function";

const base = [1, 2, 5, {}, "x", "y"];

base.map(of('hi')); // ["hi", "hi", "hi", "hi", "hi", "hi"]
```

### Map

#### [Merge](https://thalesrc.github.io/js-utils/modules/_map_merge_.html)
Merges two maps

```typescript
import { merge } from "@thalesrc/js-utils/map";

const first = new Map();
first.set("a", 1);

const second = new Map();
second.set("b", 2);
merge(first, second); // [{key: "a", value: 1}, {key: "b", value: 2}]
```

### Math

#### [Min-Max](https://thalesrc.github.io/js-utils/modules/_math_min_max_.html)
Limits the value by specified range

```typescript
import { minMax } from "@thalesrc/js-utils/math";

const limitedValue = minMax(200, 300, Math.random() * 1000); // Outputs between 200-300
```

### Object

#### [Clone](https://thalesrc.github.io/js-utils/modules/_object_clone_.html)
A function to deep clone anything (recursively)

```typescript
import { clone } from "@thalesrc/js-utils/object";

const object = {a: 1, b: {c: true, d: ["x", "y"]}};

const clonedObject = clone(object);
// {a: 1, b: {c: true, d: ["x", "y"]}}
// object.b.d === clonedObject.b.d // false
```

#### [Compact](https://thalesrc.github.io/js-utils/modules/_object_compact_.html)
Removes `null` and `undefined` values and their keys from an object

```typescript
import { compact } from "@thalesrc/js-utils/object";

const a = {
 x: null,
 y: undefined,
 z: 20
};

compact(a); // {z: 20}
```

#### [Deepest](https://thalesrc.github.io/js-utils/modules/_object_deepest_.html)
Get deepest value in an object chain

```typescript
import { deepest } from "@thalesrc/js-utils/object";

const a = {x: null};
const b = {x: a};
const c = {x: b};

deepest(c, 'x'); // {x: null} (a)
```

### Promise

#### [Revert](https://thalesrc.github.io/js-utils/modules/_promise_revert_.html)
Exchanges resolve state with rejection of a promise

```typescript
import { revert } from "@thalesrc/js-utils/promise";

const errorPromise = Promise.reject(new Error('foo'));

revert(errorPromise)
 .then(err => {
   console.log("this will be logged", err);
 })
 .catch(res => {
   console.log("this won't be logged", res);
 });
```

#### [Timeout](https://thalesrc.github.io/js-utils/modules/_promise_timeout_.html)
Returns a promise which resolves after specified time

```typescript
import { timeout } from "@thalesrc/js-utils/promise";

timeout(1000)
 .then(() => console.log("will be logged after a second"));
```

#### [Try Catch](https://thalesrc.github.io/js-utils/modules/_promise_try_catch_.html)
Merges result and error in the same callback

```typescript
import { tryCatch } from "@thalesrc/js-utils/promise";

const promise = anAsyncCall();

const [error, result] = await tryCatch(promise);
```

### String

#### [Limit](https://thalesrc.github.io/js-utils/modules/_string_limit_.html)
Limits the string to `n` character

```typescript
import { limit } from "@thalesrc/js-utils/string";

const str = 'foobarbaz';

limit(str, 3); // 'foo'
```

### Etc.

#### [Compact](https://thalesrc.github.io/js-utils/modules/_compact_.html)
Filters falsy values of the given array
Removes `null` and `undefined` values and their keys from an object

```typescript
import { compact } from "@thalesrc/js-utils";

const arr = [undefined, "", false, 0, 1, "1"];
const compacted = compact(arr); // [1, "1"];

const object = {
 x: null,
 y: undefined,
 z: 20
};

const compacted = compact(object); // {z: 20}
```

#### [Is Falsy](https://thalesrc.github.io/js-utils/modules/_is_falsy_.html)
Returns whether the entered value is falsy

```typescript
import { isFalsy } from "@thalesrc/js-utils";

isFalsy(undefined); // true
isFalsy(true); // false
```

#### [Is Truthy](https://thalesrc.github.io/js-utils/modules/_is_truthy_.html)
Returns whether the entered value is truthy

```typescript
import { isTruthy } from "@thalesrc/js-utils";

isTruthy(undefined); // false
isTruthy(true); // true
```

#### [Limit](https://thalesrc.github.io/js-utils/modules/_limit_.html)
Limits the string or array to `n` character

```typescript
import { limit } from "@thalesrc/js-utils";

const str = 'foobarbaz';
const array = ["a", "b", "c", "d", "e", "f"];

limit(str, 3); // 'foo'
limit(array, 3); // ["a", "b", "c"]
```

#### [Open Promise](https://thalesrc.github.io/js-utils/modules/_open-promise_.html)
A promise constructor to resolve or reject from outside

```typescript
import { OpenPromise } from "@thalesrc/js-utils";

const aPromiseWillBeResolvedLater = new OpenPromise();

aPromiseWillBeResolvedLater.promise.then(val => console.log(val));

aPromiseWillBeResolvedLater.resolve({x: 1});
// logs `{x: 1}`
```

#### [Smart Map](https://thalesrc.github.io/js-utils/modules/_smart_map_.html)
Like WeakMap but can also store values using primitive keys

See: [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

```typescript
import { SmartMap } from "@thalesrc/js-utils";

const aMap = new SmartMap();

aMap.set("foo", "foo");
aMap.set(1, "thales rocks");
console.log(aMap.size) // 2

aMap.set({}, "thales rocks again");
console.log(aMap.size) // 2

const anObject = {};
aMap.set(anObject, "thales rocks again and again");
console.log(aMap.size) // 3
console.log(aMap.get(anObject)) // "thales rocks again and again"
```

#### [Unique Id](https://thalesrc.github.io/js-utils/modules/_unique-id_.html)
Starts a new counter for every unique prefix and if a prefix is given, returns the id by prefixing it, otherwise returns the id as number

```typescript
import { uniqueId } from "@thalesrc/js-utils";

uniqueId(); // 0
uniqueId(); // 1
uniqueId("some-str"); // "some-str-0";
uniqueId("some-str"); // "some-str-1";
uniqueId(); // 3
```

## Static/Prototype Methods

You may use any of these methods by adding them to the constructors or prototypes to native objects in main file.

Prototype Example:

```typescript
// main.ts
import "@thalesrc/js-utils/array/proto/compact";

// somewhere else
const arr = [undefined, "", false, 0, 1, "1", null];
const compacted = arr.compact(); // [1, "1"];

```

Static Example:

```typescript
// main.ts
import "@thalesrc/js-utils/promise/static/timeout";

// somewhere else
Promise.timeout(1000)
 .then(() => console.log("will be logged after a second"));
```

## Legacy Typescript Support

Install legacy build

`npm install @thalesrc/js-utils@legacy --save`
## License

[MIT](./LICENSE)