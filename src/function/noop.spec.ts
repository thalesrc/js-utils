import 'jest';

import { noop } from './noop';

describe('Noop Function', () => {
  it('should return void', () => {
    expect(noop()).toBe(undefined);
    expect(noop.call(this, 'a', 1, true, {})).toBe(undefined);
  });
});
