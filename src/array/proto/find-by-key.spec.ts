import 'jest';

import './find-by-key';
import { findByKey } from '../find-by-key';

describe('Array FindByKey Proto Function', () => {
  it('should work as same', () => {
    const foo = [{a: 1}, {a: 2}, {a: 3}];

    expect(foo.findByKey('a', 1)).toEqual(findByKey(foo, 'a', 1));
    expect(foo.findByKey('a', 2)).toEqual(findByKey(foo, 'a', 2));

    expect(foo.findByKey('a', 4)).toBe(findByKey(foo, 'a', 4));
  });
});
