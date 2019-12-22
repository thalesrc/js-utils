import 'jest';

import './is-truthy';

describe('IsTruthy Static Function', () => {
  it('should return "true" when truthy values passed', () => {
    expect(Boolean.isTruthy(true)).toBe(true);
    expect(Boolean.isTruthy('a')).toBe(true);
    expect(Boolean.isTruthy(1)).toBe(true);
    expect(Boolean.isTruthy(-1)).toBe(true);
    expect(Boolean.isTruthy({})).toBe(true);
  });

  it('should return "false" when falsy values passed', () => {
    expect(Boolean.isTruthy(false)).toBe(false);
    expect(Boolean.isTruthy('')).toBe(false);
    expect(Boolean.isTruthy(0)).toBe(false);
    expect(Boolean.isTruthy(null)).toBe(false);
    expect(Boolean.isTruthy(undefined)).toBe(false);
    expect(Boolean.isTruthy(NaN)).toBe(false);
  });
});
