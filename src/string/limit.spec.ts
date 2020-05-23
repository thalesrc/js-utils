import 'jest';

import { limit } from './limit';

describe('Limit Function', () => {
  let foo: string;

  beforeEach(() => {
    foo = 'foobarbaz';
  });

  it('should slice the string up', () => {
    expect(limit(foo, 3)).toBe('foo');
  });

  it('should return empty string when count is 0', () => {
    expect(limit(foo, 0)).toBe('');
  });

  it('shouldn\'t slice when count is negative', () => {
    expect(limit(foo, -1)).toBe('foobarbaz');
  });

  it('should return whole items when count is bigger than length', () => {
    expect(limit(foo, 10)).toBe('foobarbaz');
  });
});
