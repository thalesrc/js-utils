import 'jest';

import './clone';
import { clone } from '../clone';

describe('Clone Static Function', () => {
  it('should act as same', () => {
    const foo = {x: 1, y: 2, z: [{a: true, b: () => false}]};
    const bar = clone(foo);
    const baz = Object.clone(foo);

    expect(bar).toEqual(baz);
  });
});
