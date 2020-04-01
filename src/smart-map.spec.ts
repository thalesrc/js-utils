import 'jest';

import { SmartMap } from './smart-map';

describe('SmartMap Class', () => {
  let map: SmartMap;

  beforeEach(() => {
    map = new SmartMap();
  });

  it('should construct properly', () => {
    const mapWithValues = new SmartMap([['key', 'value'], ['key2', 'value2']]);

    expect(map).toBeDefined();
    expect(mapWithValues).toBeDefined();
    expect([...mapWithValues.entries()]).toEqual([...new Map([['key', 'value'], ['key2', 'value2']]).entries()]);
  });

  it('should set a value by primitive type keys', () => {
    map.set(1, 'number');
    map.set('string', 'string');
    map.set(true, 'boolean');
    map.set(Symbol(), 'symbol');
    map.set(undefined, 'undefined');
    map.set(null, 'null');

    expect(map.size).toBe(6);
  });

  it('should set a value by object type keys', () => {
    const anObj = {};

    map.set(anObj, 'foo');
    expect(map.has(anObj)).toBe(true);
  });

  it('should store object keys in weakmap storage', () => {
    const anObj = {};

    map.set(anObj, 'foo');

    expect(map.size).toBe(0);
    expect(map.has(anObj)).toBe(true);
  });

  it('should check correctly when has method called via both primitive and object keys', () => {
    const anObj = {};

    map.set(1, '1');
    map.set(anObj, 'an object');

    expect(map.has(1)).toBe(true);
    expect(map.has(anObj)).toBe(true);
  });

  it('should get value when get method called via both primitive and object keys', () => {
    const anObj = {};

    map.set(1, '1');
    map.set(anObj, 'an object');
    map.set(null, 'null');

    expect(map.get(1)).toBe('1');
    expect(map.get(anObj)).toBe('an object');
    expect(map.get(null)).toBe('null');
  });

  it('should delete value when delete method called via both primitive and object key', () => {
    const anObj = {};

    map.set(1, '1');
    map.set(anObj, 'an object');

    const primitiveResult = map.delete(1);
    const objectResult = map.delete(anObj);

    expect(primitiveResult).toBe(true);
    expect(objectResult).toBe(true);

    expect(map.size).toBe(0);
    expect(map.has(anObj)).toBe(false);
  });
});
