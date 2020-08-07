import 'jest';

import './compact';
import { compact } from '../compact';

describe('Compact Static Function', () => {
  it('should act as same', () => {
    const foo = {x: undefined, y: null, z: 20};
    const bar = compact(foo);
    const baz = Object.compact(foo);

    expect(bar).toEqual(baz);
  });
});
