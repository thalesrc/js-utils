import { expect } from 'chai';
import 'mocha';

import { isFalsy } from "./is-falsy";

describe('IsFalsy Function', () => {
  it('should return "false" when truthy values passed', () => {
    expect(isFalsy(true)).to.eq(false);
    expect(isFalsy("a")).to.eq(false);
    expect(isFalsy(1)).to.eq(false);
    expect(isFalsy(-1)).to.eq(false);
    expect(isFalsy({})).to.eq(false);
  });

  it('should return "true" when falsy values passed', () => {
    expect(isFalsy(false)).to.eq(true);
    expect(isFalsy("")).to.eq(true);
    expect(isFalsy(0)).to.eq(true);
    expect(isFalsy(null)).to.eq(true);
    expect(isFalsy(undefined)).to.eq(true);
    expect(isFalsy(NaN)).to.eq(true);
  });
});
