[@gen-tech/js-utils](../README.md) > ["unique-id"](../modules/_unique_id_.md)

# External module: "unique-id"

## Index

### Functions

* [uniqueId](_unique_id_.md#uniqueid)

---

## Functions

<a id="uniqueid"></a>

###  uniqueId

▸ **uniqueId**(prefix?: *`string`*): `string` |`number`

*Defined in [unique-id.ts:34](https://github.com/gen-tech/js-utils/blob/6e1149a/src/unique-id.ts#L34)*

#### Generates a unique id

Starts a new counter for every unique prefix and if a prefix is given, returns the id by prefixing it, otherwise returns the id as number

* * *

Example usage:

    import { uniqueId } from "@gen-tech/js-utils";
    
    uniqueId(); // 0
    uniqueId(); // 1
    uniqueId("some-str"); // "some-str-0";
    uniqueId("some-str"); // "some-str-1";
    uniqueId(); // 3
    

* * *

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| `Optional` prefix | `string` |  prefix to prepend into the unique id |

**Returns:** `string` |
`number`

A unique id

___

