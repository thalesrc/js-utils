import { expect } from 'chai';
import 'mocha';

import { difference } from "./difference";

describe('Difference Function', () => {
  it('should return difference of array base and array substractor', () => {
    const foo = [1, 2, 3, 1, 2, 3];
    const bar = [1, 2];

    expect(difference(foo, bar)).to.eql([3, 3]);
  });

  it('should return difference of set base and array substractor', () => {
    const foo = new Set([1, 2, 3, 4, 5]);
    const bar = [1, 2];

    expect(difference(foo, bar)).to.eql(new Set([3, 4, 5]));
  });

  it('should return difference of array base and set substractor', () => {
    const foo = [1, 2, 3, 1, 2, 3];
    const bar = new Set([1, 2]);

    expect(difference(foo, bar)).to.eql([3, 3]);
  });

  it('should return difference of set base and set substractor', () => {
    const foo = new Set([1, 2, 3, 4, 5]);
    const bar = new Set([1, 2]);

    expect(difference(foo, bar)).to.eql(new Set([3, 4, 5]));
  });

  it('should return all difference without removing same values more than once', () => {
    const foo = [1, 2, 3, 1, 2, 3];
    const bar = [1, 2];
    const baz = [2, 3, 1];

    expect(difference(foo, bar, true)).to.eql([3, 1, 2, 3]);
    expect(difference(foo, baz, true)).to.eql([1, 2, 3]);
  });

  it('should work properly when substraction array has values which base hasn\'t', () => {
    const foo = [1, 2, 3, 1, 2, 3];
    const bar = [1, 2, "x", "y"];

    expect(difference(foo, bar)).to.eql([3, 3]);
    expect(difference(foo, bar, true)).to.eql([3, 1, 2, 3]);
  });
});
