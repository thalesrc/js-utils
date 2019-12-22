import { expect } from 'chai';
import 'mocha';

import { compact } from "./compact";

describe('Compact Function', () => {
  it('should remove all falsy values', () => {
    const array = [0, "", undefined, NaN, null, false];
    const result = compact([...array, ...array]);
    expect(result.length).to.eq(0);
  });

  it('should keep only truthy values', () => {
    const falsyValues = [0, "", undefined, NaN, null, false];
    const truthyValues = ["asd", 1, true, [], {}, Symbol()];
    const result = compact([...falsyValues, ...truthyValues]);
    expect(result).to.eql(truthyValues);
  });
});
