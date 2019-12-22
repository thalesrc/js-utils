import 'jest';

import './uniquify';
import { uniquify } from '../uniquify';

describe('Array Uniquify Proto Function', () => {
  it('should work as same', () => {
    const foo = [1, 2, 3, 1, 2, 3];
    const bar = [1, 2];

    expect(foo.uniquify()).toEqual(uniquify(foo));
    expect(bar.uniquify()).toEqual(uniquify(bar));
  });
});
