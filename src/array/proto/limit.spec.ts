import 'jest';

import './limit';
import { limit } from '../limit';

describe('Array Limit Proto Function', () => {
  it('should work as same', () => {
    const foo = [1, 2, 3, 4, 5, 6];

    expect(foo.limit(3)).toEqual(limit(foo, 3));
    expect(foo.limit(0)).toEqual(limit(foo, 0));
    expect(foo.limit(-1)).toEqual(limit(foo, -1));
    expect(foo.limit(10)).toEqual(limit(foo, 10));
  });
});
