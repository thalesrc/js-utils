import 'jest';

import { isFalsy } from './is-falsy';

describe('IsFalsy Function', () => {
  it('should return "false" when truthy values passed', () => {
    expect(isFalsy(true)).toBe(false);
    expect(isFalsy('a')).toBe(false);
    expect(isFalsy(1)).toBe(false);
    expect(isFalsy(-1)).toBe(false);
    expect(isFalsy({})).toBe(false);
  });

  it('should return "true" when falsy values passed', () => {
    expect(isFalsy(false)).toBe(true);
    expect(isFalsy('')).toBe(true);
    expect(isFalsy(0)).toBe(true);
    expect(isFalsy(null)).toBe(true);
    expect(isFalsy(undefined)).toBe(true);
    expect(isFalsy(NaN)).toBe(true);
  });
});
