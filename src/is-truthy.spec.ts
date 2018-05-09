import { expect } from 'chai';
import 'mocha';

import { isTruthy } from "./is-truthy";

describe('IsTruthy Function', () => {
  it('should return "true" when truthy values passed', () => {
    expect(isTruthy(true)).to.eq(true);
    expect(isTruthy("a")).to.eq(true);
    expect(isTruthy(1)).to.eq(true);
    expect(isTruthy(-1)).to.eq(true);
    expect(isTruthy({})).to.eq(true);
  });

  it('should return "false" when falsy values passed', () => {
    expect(isTruthy(false)).to.eq(false);
    expect(isTruthy("")).to.eq(false);
    expect(isTruthy(0)).to.eq(false);
    expect(isTruthy(null)).to.eq(false);
    expect(isTruthy(undefined)).to.eq(false);
    expect(isTruthy(NaN)).to.eq(false);
  });
});
