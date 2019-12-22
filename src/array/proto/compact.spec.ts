import { expect } from 'chai';
import 'mocha';

import "./compact";

describe('Compact Proto Function', () => {
  it('should remove all falsy values', () => {
    const array = [0, "", undefined, NaN, null, false];
    const result = [...array, ...array].compact();
    expect(result.length).to.eq(0);
  });

  it('should keep only truthy values', () => {
    const falsyValues = [0, "", undefined, NaN, null, false];
    const truthyValues = ["asd", 1, true, [], {}, Symbol()];
    const result = [...falsyValues, ...truthyValues].compact();
    expect(result).to.eql(truthyValues);
  });
});
