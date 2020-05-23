import 'jest';

import { limit } from './limit';

describe('Limit Function', () => {
  let foo: number[];

  beforeEach(() => {
    foo = [1, 2, 3, 4, 5, 6];
  });

  it('should slice the array up', () => {
    expect(limit(foo, 3)).toEqual([1, 2, 3]);
  });

  it('should return empty array when count is 0', () => {
    expect(limit(foo, 0)).toEqual([]);
  });

  it('shouldn\'t slice when count is negative', () => {
    expect(limit(foo, -1)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('should return whole items when count is bigger than length', () => {
    expect(limit(foo, 10)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
