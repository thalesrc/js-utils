import 'jest';

import { remove } from './remove';

describe('Remove Function', () => {
  let foo: number[];

  beforeEach(() => {
    foo = [1, 2, 3, 1, 2, 3];
  });

  it('should remove one item successfully', () => {
    expect(remove(foo, 2)).toEqual([1, 3, 1, 2, 3]);
  });

  it('shouldn\'t remove nonfound item', () => {
    expect(remove(foo, 4)).toEqual([1, 2, 3, 1, 2, 3]);
  });

  it('should remove multiply', () => {
    expect(remove(foo, 3, true)).toEqual([1, 2, 1, 2]);
  });
});
