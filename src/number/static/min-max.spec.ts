import 'jest';

import './min-max';

describe('MinMax Static Function', () => {
  it('should return min limit when the value below limit', () => {
    const result = Math.minMax(10, 20, 5);
    expect(result).toBe(10);
  });

  it('should return max limit when the value above limit', () => {
    const result = Math.minMax(10, 20, 25);
    expect(result).toBe(20);
  });

  it('should return passed value when the value is between limits', () => {
    const result = Math.minMax(10, 20, 15);
    expect(result).toBe(15);
  });

  it('should return NaN if an argument is NaN', () => {
    expect(Math.minMax(NaN, 20, 15)).toEqual(NaN);
    expect(Math.minMax(10, NaN, 15)).toEqual(NaN);
    expect(Math.minMax(10, 20, NaN)).toEqual(NaN);
    expect(Math.minMax(NaN, NaN, 15)).toEqual(NaN);
    expect(Math.minMax(10, NaN, NaN)).toEqual(NaN);
    expect(Math.minMax(NaN, 15, NaN)).toEqual(NaN);
    expect(Math.minMax(NaN, NaN, NaN)).toEqual(NaN);
  });
});
