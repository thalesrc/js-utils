import 'jest';

import './limit';
import { limit } from '../limit';

describe('String Limit Proto Function', () => {
  it('should work as same', () => {
    const foo = 'foobarbaz';

    expect(foo.limit(3)).toEqual(limit(foo, 3));
    expect(foo.limit(0)).toEqual(limit(foo, 0));
    expect(foo.limit(-1)).toEqual(limit(foo, -1));
    expect(foo.limit(10)).toEqual(limit(foo, 10));
  });
});
