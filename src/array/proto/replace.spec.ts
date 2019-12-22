import 'jest';

import './replace';
import { replace } from '../replace';

describe('Array Replace Proto Function', () => {
  it('should work as same', () => {
    const foo = [1, 2, 3, 1, 2, 3];

    expect(foo.replace(2, 100)).toEqual(replace(foo, 2, 100));
    expect(foo.replace(4, 100)).toEqual(replace(foo, 4, 100));

    const itemOptions = {startingIndex: 2, deleteCount: 2, itemsToReplace: [100, 101]};
    expect(foo.replace(itemOptions)).toEqual(replace(foo, itemOptions));

    const mapOptions = {itemsToReplace: new Map([[2, 100], [3, 101]])};
    expect(foo.replace(mapOptions)).toEqual(replace(foo, mapOptions));

    const mapOptionsMulti = {itemsToReplace: new Map([[2, 100], [3, 101]]), multi: true};
    expect(foo.replace(mapOptionsMulti)).toEqual(replace(foo, mapOptionsMulti));
  });
});
