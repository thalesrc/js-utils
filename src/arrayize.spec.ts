import 'jest';

import { arrayize } from './arrayize';

describe('Arrayize Function', () => {
  it('should encapsulate a non array value', () => {
    const foo = 'foo';
    const bar = {bar: 'bar'};
    const baz = null;

    expect(arrayize(foo)).toEqual(['foo']);
    expect(arrayize(bar)).toEqual([{bar: 'bar'}]);
    expect(arrayize(baz)).toEqual([null]);
  });

  it('should not encapsulate when the value is an array', () => {
    const foo = ['foo'];

    expect(arrayize(foo)).toEqual(['foo']);
  });
});
