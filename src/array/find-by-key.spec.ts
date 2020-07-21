import 'jest';
import { findByKey } from './find-by-key';

describe('FindByKey Function', () => {
  let foo: {a: number; }[];

  beforeEach(() => {
    foo = [{a: 1}, {a: 2}, {a: 3}];
  });

  it('should find item successfully', () => {
    expect(findByKey(foo, 'a', 1)).toEqual({a: 1});
  });

  it('should return `undefined` when item not found', () => {
    expect(findByKey(foo, 'a', 4)).toBe(undefined);
  });
});
