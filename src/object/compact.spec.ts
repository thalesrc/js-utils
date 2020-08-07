import 'jest';

import { compact } from './compact';

describe('Compact Function', () => {
  it('should delete null values', () => {
    const a = {x: null, y: null, z: 20};

    expect(compact(a)).toEqual({z: 20});
  });

  it('should delete undefined values', () => {
    const a = {x: undefined, y: undefined, z: 20};

    expect(compact(a)).toEqual({z: 20});
  });

  it('should delete undefined/null values', () => {
    const a = {x: undefined, y: null, z: 20};

    expect(compact(a)).toEqual({z: 20});
  });
});
