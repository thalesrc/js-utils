import { expect } from 'chai';
import 'mocha';

import "./array-difference";
import { difference } from "../difference";

describe('Array Difference Proto Function', () => {
  it('should work as same', () => {
    const foo = [1, 2, 3, 1, 2, 3];
    const bar = [1, 2];
    const baz = new Set([2, 3]);

    expect(foo.difference(bar)).to.eql(difference(foo, bar));
    expect(foo.difference(baz)).to.eql(difference(foo, baz));

    expect(foo.difference(bar, true)).to.eql(difference(foo, bar, true));
    expect(foo.difference(baz, true)).to.eql(difference(foo, baz, true));
  });
});
