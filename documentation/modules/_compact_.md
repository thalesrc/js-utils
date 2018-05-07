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

*Defined in [compact.ts:30](https://github.com/gen-tech/js-utils/blob/6e1149a/src/compact.ts#L30)*

#### Filters falsy values of the given array

*   does not modify the original array
*   Values to be filtered: `[undefined, null, "", 0, false, NaN]`

* * *

Example usage:

    import { compact } from "@gen-tech/js-utils";
    
    const arr = [undefined, "", false, 0, 1, "1"];
    const compacted = compact(arr); // [1, "1"];
    
    

Example as Array Prototype:

    import "@gen-tech/js-utils/dist/as-proto/compact";
    
    const arr = [undefined, "", false, 0, 1, "1"];
    const compacted = arr.compact(); // [1, "1"];
    

* * *

**Type parameters:**

#### T 

type of array

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| arrayToCompact | `T`[] |  array to compact |

**Returns:** `T`[]
__a	new__ compacted array

___

