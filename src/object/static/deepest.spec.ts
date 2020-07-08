import 'jest';

import './deepest';
import { deepest } from '../deepest';

describe('Deepest Static Function', () => {
  it('should act as same', () => {
    const a = {x: null};
    const b = {x: a};
    const c = {x: b};

    expect(deepest(c, 'x')).toBe(Object.deepest(c, 'x'));
  });
});
