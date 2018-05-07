[@gen-tech/js-utils](../README.md) > ["is-truthy"](../modules/_is_truthy_.md)

# External module: "is-truthy"

## Index

### Functions

* [isTruthy](_is_truthy_.md#istruthy)

---

## Functions

<a id="istruthy"></a>

###  isTruthy

▸ **isTruthy**(value: *`any`*): `boolean`

*Defined in [is-truthy.ts:16](https://github.com/gen-tech/js-utils/blob/b26de53/src/is-truthy.ts#L16)*

Returns whether the entered value is truthy

Example usage:

    import { isTruthy } from "@gen-tech/js-utils";
    
    isTruthy(undefined); // false
    isTruthy(true); // true
    isTruthy([]) // true
    
    const truthyValues = ["a", undefined, "b", "", "c"].filter(isTruthy); // ["a", "b", "c"]

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| value | `any` |  value to be checked |

**Returns:** `boolean`

___

