import 'jest';

import './is-falsy';

describe('IsFalsy Static Function', () => {
  it('should return "false" when truthy values passed', () => {
    expect(Boolean.isFalsy(true)).toBe(false);
    expect(Boolean.isFalsy('a')).toBe(false);
    expect(Boolean.isFalsy(1)).toBe(false);
    expect(Boolean.isFalsy(-1)).toBe(false);
    expect(Boolean.isFalsy({})).toBe(false);
  });

  it('should return "true" when falsy values passed', () => {
    expect(Boolean.isFalsy(false)).toBe(true);
    expect(Boolean.isFalsy('')).toBe(true);
    expect(Boolean.isFalsy(0)).toBe(true);
    expect(Boolean.isFalsy(null)).toBe(true);
    expect(Boolean.isFalsy(undefined)).toBe(true);
    expect(Boolean.isFalsy(NaN)).toBe(true);
  });
});
