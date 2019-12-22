import 'jest';

import { replace } from './replace';

describe('Replace Function', () => {
  let foo: number[];

  beforeEach(() => {
    foo = [1, 2, 3, 1, 2, 3];
  });

  it('should replace one item successfully', () => {
    expect(replace(foo, 2, 100)).toEqual([1, 100, 3, 1, 2, 3]);
  });

  it('shouldn\'t replace nonfound item', () => {
    expect(replace(foo, 4, 100)).toEqual([1, 2, 3, 1, 2, 3]);
  });

  it('should replace items from index 0 when startingIndex is not defined', () => {
    expect(replace(foo, {itemsToReplace: [100]})).toEqual([100, 2, 3, 1, 2, 3]);
  });

  it('should add items when itemsToReplace array contains multiple elements', () => {
    expect(replace(foo, {itemsToReplace: [100, 101, 102]})).toEqual([100, 101, 102, 2, 3, 1, 2, 3]);
  });

  it('should delete items as defined', () => {
    expect(replace(foo, {itemsToReplace: [100], deleteCount: 2})).toEqual([100, 3, 1, 2, 3]);
  });

  it('should start replacing from startingIndex', () => {
    expect(replace(foo, { startingIndex: 2, itemsToReplace: [100]})).toEqual([1, 2, 100, 1, 2, 3]);
  });

  it('should replace by using mode: `replace by map`', () => {
    expect(replace(foo, {itemsToReplace: new Map([[2, 100]])})).toEqual([1, 100, 3, 1, 2, 3]);
  });

  it('should replace multiple when multi set as true', () => {
    expect(replace(foo, {itemsToReplace: new Map([[2, 100]]), multi: true})).toEqual([1, 100, 3, 1, 100, 3]);
  });
});
