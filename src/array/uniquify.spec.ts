import { expect } from 'chai';
import 'mocha';

import { uniquify } from './uniquify';

describe('Uniquify Function', () => {
  it('should remove repeated items from array', () => {
    const a1 = [1, 2, 3];
    const a2 = [1, 1, 2, 2, 3, 3];

    expect(uniquify(a1)).to.eql([1, 2, 3]);
    expect(uniquify(a2)).to.eql([1, 2, 3]);
  });
});
