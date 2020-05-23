import 'jest';

import { limit } from './limit';

describe('Limit Universal Function', () => {
  let foo: number[];
  let bar: string;

  beforeEach(() => {
    foo = [1, 2, 3, 4, 5, 6];
    bar = 'foobarbaz';
  });

  it('should slice the array up', () => {
    expect(limit(foo, 3)).toEqual([1, 2, 3]);
    expect(limit(bar, 3)).toBe('foo');
  });

  it('should return empty array when count is 0', () => {
    expect(limit(foo, 0)).toEqual([]);
    expect(limit(bar, 0)).toBe('');
  });

  it('shouldn\'t slice when count is negative', () => {
    expect(limit(foo, -1)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(limit(bar, -1)).toBe('foobarbaz');
  });

  it('should return whole items when count is bigger than length', () => {
    expect(limit(foo, 10)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(limit(bar, 10)).toBe('foobarbaz');
  });
});
