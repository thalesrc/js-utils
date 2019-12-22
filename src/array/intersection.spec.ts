import 'jest';

import { intersection } from './intersection';

describe('Intersection Function', () => {
  it('should return intersection of array base and array inclusion', () => {
    const foo = [1, 2, 3, 1, 2, 3];
    const bar = [1, 2];

    expect(intersection(foo, bar)).toEqual([1, 2, 1, 2]);
  });

  it('should return intersection of set base and array inclusion', () => {
    const foo = new Set([1, 2, 3, 4, 5]);
    const bar = [1, 2];

    expect(intersection(foo, bar)).toEqual(new Set([1, 2]));
  });

  it('should return intersection of array base and set inclusion', () => {
    const foo = [1, 2, 3, 1, 2, 3];
    const bar = new Set([1, 2]);

    expect(intersection(foo, bar)).toEqual([1, 2, 1, 2]);
  });

  it('should return intersection of set base and set inclusion', () => {
    const foo = new Set([1, 2, 3, 4, 5]);
    const bar = new Set([1, 2]);

    expect(intersection(foo, bar)).toEqual(new Set([1, 2]));
  });

  it('should return real intesection without adding same values more than once', () => {
    const foo = [1, 2, 3, 1, 2, 3];
    const bar = [1, 2];
    const baz = [2, 3, 2];

    expect(intersection(foo, bar, false)).toEqual([1, 2]);
    expect(intersection(foo, baz, false)).toEqual([2, 3, 2]);
  });

  it('should work properly when inclusion array has values which base hasn\'t', () => {
    const foo = [1, 2, 3, 1, 2, 3];
    const bar = [1, 2, 'x', 'y'];

    expect(intersection(foo, bar)).toEqual([1, 2, 1, 2]);
    expect(intersection(foo, bar, false)).toEqual([1, 2]);
  });
});
