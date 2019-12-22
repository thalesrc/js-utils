import 'jest';

import { isTruthy } from './is-truthy';

describe('IsTruthy Function', () => {
  it('should return "true" when truthy values passed', () => {
    expect(isTruthy(true)).toBe(true);
    expect(isTruthy('a')).toBe(true);
    expect(isTruthy(1)).toBe(true);
    expect(isTruthy(-1)).toBe(true);
    expect(isTruthy({})).toBe(true);
  });

  it('should return "false" when falsy values passed', () => {
    expect(isTruthy(false)).toBe(false);
    expect(isTruthy('')).toBe(false);
    expect(isTruthy(0)).toBe(false);
    expect(isTruthy(null)).toBe(false);
    expect(isTruthy(undefined)).toBe(false);
    expect(isTruthy(NaN)).toBe(false);
  });
});
