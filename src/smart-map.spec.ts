import { expect, assert } from 'chai';
import 'mocha';

import { SmartMap } from './smart-map';

describe('SmartMap Class', () => {
  let map: SmartMap;

  beforeEach(() => {
    map = new SmartMap();
  });

  it('should construct properly', () => {
    const mapWithValues = new SmartMap([['key', 'value'], ['key2', 'value2']]);

    assert.isDefined(map);
    assert.isDefined(mapWithValues);
    expect([...mapWithValues.entries()]).to.be.eql([...new Map([['key', 'value'], ['key2', 'value2']]).entries()]);
  });

  it('should set a value by primitive type keys', () => {
    map.set(1, 'number');
    map.set('string', 'string');
    map.set(true, 'boolean');
    map.set(Symbol(), 'symbol');
    map.set(undefined, 'undefined');

    expect(map.size).to.eq(5);
  });

  it('should set a value by object type keys', () => {
    const anObj = {};

    map.set(anObj, 'foo');
    expect(map.has(anObj)).to.be.true;
  });

  it('should store object keys in weakmap storage', () => {
    const anObj = {};

    map.set(anObj, 'foo');

    expect(map.size).to.eq(0);
    expect(map.has(anObj)).to.be.true;
  });

  it('should check correctly when has method called via both primitive and object keys', () => {
    const anObj = {};

    map.set(1, '1');
    map.set(anObj, 'an object');

    expect(map.has(1)).to.be.true;
    expect(map.has(anObj)).to.be.true;
  });

  it('should get value when get method called via both primitive and object keys', () => {
    const anObj = {};

    map.set(1, '1');
    map.set(anObj, 'an object');

    expect(map.get(1)).to.eq('1');
    expect(map.get(anObj)).to.eq('an object');
  });

  it('should delete value when delete method called via both primitive and object key', () => {
    const anObj = {};

    map.set(1, '1');
    map.set(anObj, 'an object');

    const primitiveResult = map.delete(1);
    const objectResult = map.delete(anObj);

    expect(primitiveResult).to.be.true;
    expect(objectResult).to.be.true;

    expect(map.size).to.eq(0);
    expect(map.has(anObj)).to.be.false;
  });
});
