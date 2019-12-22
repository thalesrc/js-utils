import 'jest';

import { uniqueId } from './unique-id';

describe('Unique Id Function', () => {
  it('should return a unique number on every call', () => {
    const idSet = [];
    for (let i = 0; i < 100; i++) {
      const id = uniqueId();
      expect(idSet).not.toContain(id);
      idSet.push(id);
    }
  });

  it('should start a new counter for each unique prefix', () => {
    expect(uniqueId('foo')).toBe('foo-0');
    expect(uniqueId('bar')).toBe('bar-0');
    expect(uniqueId('baz')).toBe('baz-0');

    expect(uniqueId('foo')).toBe('foo-1');
    expect(uniqueId('bar')).toBe('bar-1');
    expect(uniqueId('baz')).toBe('baz-1');
  });
});
