import { expect } from 'chai';
import 'mocha';

import { remove } from "./remove";

describe('Remove Function', () => {
  let foo: number[];

  beforeEach(() => {
    foo = [1, 2, 3, 1, 2, 3];
  });

  it('should remove one item successfully', () => {
    expect(remove(foo, 2)).to.eql([1, 3, 1, 2, 3]);
  });

  it('shouldn\'t remove nonfound item', () => {
    expect(remove(foo, 4)).to.eql([1, 2, 3, 1, 2, 3]);
  });

  it('should remove multiply', () => {
    expect(remove(foo, 3, true)).to.eql([1, 2, 1, 2]);
  });
});
