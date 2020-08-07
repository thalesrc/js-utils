import 'jest';

import { compact } from './compact';
import { compact as arrCompact } from './array/compact';
import { compact as objCompact } from './object/compact';

describe('Compact Function', () => {
  it('should act as array compact', () => {
    const arr = [0, undefined, null, '', 'a'];

    expect(compact(arr)).toEqual(arrCompact(arr));
  });

  it('should act as object compact', () => {
    const object = {x: undefined, y: null, z: 20};

    expect(compact(object)).toEqual(objCompact(object));
  });

  it('should throw error when the value is not array nor object', () => {
    expect(() => compact(null)).toThrow(TypeError);
    expect(() => compact(0)).toThrow(TypeError);
    expect(() => compact('')).toThrow(TypeError);
    expect(() => compact(false)).toThrow(TypeError);
    expect(() => compact(Symbol())).toThrow(TypeError);
  });
});
