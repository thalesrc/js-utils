[@gen-tech/js-utils](../README.md) > ["min-max"](../modules/_min_max_.md)

# External module: "min-max"

## Index

### Functions

* [minMax](_min_max_.md#minmax)

---

## Functions

<a id="minmax"></a>

###  minMax

▸ **minMax**(min: *`number`*, max: *`number`*, value: *`number`*): `number`

*Defined in [min-max.ts:16](https://github.com/gen-tech/js-utils/blob/b26de53/src/min-max.ts#L16)*

#### Limits the value by given parameters

* * *

Example usage:

    import { minMax } from "@gen-tech/js-utils";
    
    const limitedValue = minMax(200, 300, Math.random() * 1000);
    

* * *

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| min | `number` |  minimum limit |
| max | `number` |  maximum limit |
| value | `number` |  value to limit |

**Returns:** `number`

___

