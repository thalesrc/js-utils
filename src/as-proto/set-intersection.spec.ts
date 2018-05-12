import { expect } from 'chai';
import 'mocha';

import "./set-intersection";
import { intersection } from "../intersection";

describe('Set Intersection Proto Function', () => {
  it('should work as same', () => {
    const foo = new Set([1, 2, 3, 4, 5]);
    const bar = [1, 2];
    const baz = new Set([2, 3]);

    expect(foo.intersection(bar)).to.eql(intersection(foo, bar));
    expect(foo.intersection(baz)).to.eql(intersection(foo, baz));

    expect(foo.intersection(bar, false)).to.eql(intersection(foo, bar, false));
    expect(foo.intersection(baz, false)).to.eql(intersection(foo, baz, false));
  });
});
