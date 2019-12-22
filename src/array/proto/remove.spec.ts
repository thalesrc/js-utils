import 'jest';

import './remove';
import { remove } from '../remove';

describe('Array Remove Proto Function', () => {
  it('should work as same', () => {
    const foo = [1, 2, 3, 1, 2, 3];

    expect(foo.remove(2)).toEqual(remove(foo, 2));
    expect(foo.remove(4)).toEqual(remove(foo, 4));
    expect(foo.remove(3, true)).toEqual(remove(foo, 3, true));
  });
});
