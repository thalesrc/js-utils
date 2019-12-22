import 'jest';

import './intersection';
import { intersection } from '../../array/intersection';

describe('Set Intersection Proto Function', () => {
  it('should work as same', () => {
    const foo = new Set([1, 2, 3, 4, 5]);
    const bar = [1, 2];
    const baz = new Set([2, 3]);

    expect(foo.intersection(bar)).toEqual(intersection(foo, bar));
    expect(foo.intersection(baz)).toEqual(intersection(foo, baz));

    expect(foo.intersection(bar, false)).toEqual(intersection(foo, bar, false));
    expect(foo.intersection(baz, false)).toEqual(intersection(foo, baz, false));
  });
});
