import { expect } from 'chai';
import 'mocha';

import "./noop";

describe('Noop Static Function', () => {
  it('should return void', () => {
    expect(Function.noop()).to.eq(undefined);
    expect(Function.noop.call(this, "a", 1, true, {})).to.eq(undefined);
  });
});
