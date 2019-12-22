import { expect } from 'chai';
import 'mocha';

import "./difference";
import { difference } from "../difference";

describe('Set Difference Proto Function', () => {
  it('should work as same', () => {
    const foo = new Set([1, 2, 3, 4, 5]);
    const bar = [1, 2];
    const baz = new Set([2, 3]);

    expect(foo.difference(bar)).to.eql(difference(foo, bar));
    expect(foo.difference(baz)).to.eql(difference(foo, baz));

    expect(foo.difference(bar, true)).to.eql(difference(foo, bar, true));
    expect(foo.difference(baz, true)).to.eql(difference(foo, baz, true));
  });
});
