import { expect } from 'chai';
import 'mocha';

import "./array-uniquify";
import { uniquify } from "../uniquify";

describe('Array Uniquify Proto Function', () => {
  it('should work as same', () => {
    const foo = [1, 2, 3, 1, 2, 3];
    const bar = [1, 2];

    expect(foo.uniquify()).to.eql(uniquify(foo));
    expect(bar.uniquify()).to.eql(uniquify(bar));
  });
});
