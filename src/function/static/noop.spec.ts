import 'jest';

import './noop';

describe('Noop Static Function', () => {
  it('should return void', () => {
    expect(Function.noop()).toBe(undefined);
    expect(Function.noop.call(this, 'a', 1, true, {})).toBe(undefined);
  });
});
