[@gen-tech/js-utils](../README.md) > ["is-falsy"](../modules/_is_falsy_.md)

# External module: "is-falsy"

## Index

### Functions

* [isFalsy](_is_falsy_.md#isfalsy)

---

## Functions

<a id="isfalsy"></a>

###  isFalsy

▸ **isFalsy**(value: *`boolean`*): `boolean`

*Defined in [is-falsy.ts:16](https://github.com/gen-tech/js-utils/blob/b26de53/src/is-falsy.ts#L16)*

Returns whether the entered value is falsy

Example usage:

    import { isFalsy } from "@gen-tech/js-utils";
    
    isFalsy(undefined); // true
    isFalsy(true); // false
    isFalsy([]) // false
    
    const falsyValues = ["a", undefined, "b", "", "c"].filter(isFalsy); // [undefined, ""]

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| value | `boolean` |  value to be checked |

**Returns:** `boolean`

___

