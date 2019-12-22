import 'jest';

import './of';
import { of } from '../of';

describe('Function Of Static Function', () => {
  it('should work as same', () => {
    const foo = of('foo');
    const fooStatic = Function.of('foo');

    expect(foo).toEqual(fooStatic);
  });
});
