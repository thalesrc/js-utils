import 'jest';

import { deepest } from './deepest';

describe('Deepest Function', () => {
  it('should get deepest object', () => {
    const a = {x: null};
    const b = {x: a};
    const c = {x: b};

    expect(deepest(c, 'x')).toBe(a);
  });
});
