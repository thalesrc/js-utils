import { expect } from 'chai';
import 'mocha';

import "./array-intersection";
import { intersection } from "../intersection";

describe('Array Intersecion Proto Function', () => {
  it('should work as same', () => {
    const foo = [1, 2, 3, 1, 2, 3];
    const bar = [1, 2];
    const baz = new Set([2, 3]);

    expect(foo.intersection(bar)).to.eql(intersection(foo, bar));
    expect(foo.intersection(baz)).to.eql(intersection(foo, baz));

    expect(foo.intersection(bar, false)).to.eql(intersection(foo, bar, false));
    expect(foo.intersection(baz, false)).to.eql(intersection(foo, baz, false));
  });
});
