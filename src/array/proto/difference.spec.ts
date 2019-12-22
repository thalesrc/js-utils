import 'jest';

import './difference';
import { difference } from '../difference';

describe('Array Difference Proto Function', () => {
  it('should work as same', () => {
    const foo = [1, 2, 3, 1, 2, 3];
    const bar = [1, 2];
    const baz = new Set([2, 3]);

    expect(foo.difference(bar)).toEqual(difference(foo, bar));
    expect(foo.difference(baz)).toEqual(difference(foo, baz));

    expect(foo.difference(bar, true)).toEqual(difference(foo, bar, true));
    expect(foo.difference(baz, true)).toEqual(difference(foo, baz, true));
  });
});
