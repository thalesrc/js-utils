[@gen-tech/js-utils](../README.md) > ["defer"](../modules/_defer_.md)

# External module: "defer"

## Index

### Functions

* [defer](_defer_.md#defer)

---

## Functions

<a id="defer"></a>

###  defer

▸ **defer**T(callback: *`function`*): `Promise`<`T`>

*Defined in [defer.ts:18](https://github.com/gen-tech/js-utils/blob/6e1149a/src/defer.ts#L18)*

#### Delays the execution of the passed function to increase the render performance

* * *

Example usage:

    import { defer } from "@gen-tech/js-utils";
    
    defer(() => aFunctionToDefer())
     .then(res => ...)
     .catch(err => ...);
    

* * *

**Type parameters:**

#### T 

type of the return value of the callback

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| callback | `function` |  Callback function to be executed |

**Returns:** `Promise`<`T`>
A promise which resolves with the value of the callback right after the execution

___

