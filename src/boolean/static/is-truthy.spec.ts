import { expect } from 'chai';
import 'mocha';

import './is-truthy';

describe('IsTruthy Static Function', () => {
  it('should return "true" when truthy values passed', () => {
    expect(Boolean.isTruthy(true)).to.eq(true);
    expect(Boolean.isTruthy('a')).to.eq(true);
    expect(Boolean.isTruthy(1)).to.eq(true);
    expect(Boolean.isTruthy(-1)).to.eq(true);
    expect(Boolean.isTruthy({})).to.eq(true);
  });

  it('should return "false" when falsy values passed', () => {
    expect(Boolean.isTruthy(false)).to.eq(false);
    expect(Boolean.isTruthy('')).to.eq(false);
    expect(Boolean.isTruthy(0)).to.eq(false);
    expect(Boolean.isTruthy(null)).to.eq(false);
    expect(Boolean.isTruthy(undefined)).to.eq(false);
    expect(Boolean.isTruthy(NaN)).to.eq(false);
  });
});
