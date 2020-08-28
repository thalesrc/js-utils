import 'jest';

import './uniquify-by-key';
import { uniquifyByKey } from '../uniquify-by-key';

describe('Array Uniquify By Key Proto Function', () => {
  it('should work as same', () => {
    const foo = [{a: 1}, {a: 1}, {a: 2}, {a: 3}, {a: 3}, {a: 4}];
    const bar = [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 1}];

    const firstObj = {a: 1};
    const baz = [firstObj, {a: 2}, {a: 3}, {a: 1}, {a: 1}];

    expect(foo.uniquifyByKey('a')).toEqual(uniquifyByKey(foo, 'a'));
    expect(bar.uniquifyByKey('a')).toEqual(uniquifyByKey(bar, 'a'));
    expect(baz.uniquifyByKey('a')[0]).toBe(uniquifyByKey(baz, 'a')[0]);
  });
});
