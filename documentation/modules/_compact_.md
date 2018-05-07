[@gen-tech/js-utils](../README.md) > ["compact"](../modules/_compact_.md)

# External module: "compact"

## Index

### Functions

* [compact](_compact_.md#compact)

---

## Functions

<a id="compact"></a>

###  compact

▸ **compact**T(arrayToCompact: *`T`[]*): `T`[]

*Defined in [compact.ts:14](https://github.com/gen-tech/js-utils/blob/b26de53/src/compact.ts#L14)*

Filters falsy values of the given array

**Does not modify the original array**

Values to be filtered: `[undefined, null, "", 0, false, NaN]`
*__template__*: T the type of the arrayToCompact

**Type parameters:**

#### T 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| arrayToCompact | `T`[] |  array to compact |

**Returns:** `T`[]
T[] filtered array

___

