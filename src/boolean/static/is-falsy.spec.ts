import { expect } from 'chai';
import 'mocha';

import './is-falsy';

describe('IsFalsy Static Function', () => {
  it('should return "false" when truthy values passed', () => {
    expect(Boolean.isFalsy(true)).to.eq(false);
    expect(Boolean.isFalsy('a')).to.eq(false);
    expect(Boolean.isFalsy(1)).to.eq(false);
    expect(Boolean.isFalsy(-1)).to.eq(false);
    expect(Boolean.isFalsy({})).to.eq(false);
  });

  it('should return "true" when falsy values passed', () => {
    expect(Boolean.isFalsy(false)).to.eq(true);
    expect(Boolean.isFalsy('')).to.eq(true);
    expect(Boolean.isFalsy(0)).to.eq(true);
    expect(Boolean.isFalsy(null)).to.eq(true);
    expect(Boolean.isFalsy(undefined)).to.eq(true);
    expect(Boolean.isFalsy(NaN)).to.eq(true);
  });
});
