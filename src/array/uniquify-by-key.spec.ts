import 'jest';

import { uniquifyByKey } from './uniquify-by-key';

describe('Uniquify By Key Function', () => {
  it('should remove repeated items from array', () => {
    const a1 = [{a: 1}, {a: 1}, {a: 2}, {a: 3}, {a: 3}, {a: 4}];
    const a2 = [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 1}];

    const firstObj = {a: 1};
    const a3 = [firstObj, {a: 2}, {a: 3}, {a: 1}, {a: 1}];

    expect(uniquifyByKey(a1, 'a')).toEqual([{a: 1}, {a: 2}, {a: 3}, {a: 4}]);
    expect(uniquifyByKey(a2, 'a')).toEqual([{a: 1}, {a: 2}, {a: 3}, {a: 4}]);
    expect(uniquifyByKey(a3, 'a')[0]).toBe(firstObj);
  });
});
