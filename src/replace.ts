import { start } from 'repl';

function _replace<T>(array: T[], startingIndex: number, deleteCount: number, ...itemsToReplace: T[]): T[] {
  const newArray = [...array];

  newArray.splice(startingIndex, deleteCount, ...itemsToReplace);

  return newArray;
}

export function replace<T>(array: T[], itemToRemove: T, itemToReplace: T): T[];
export function replace<T>(array: T[], itemToRemove: T, deleteCount: number, ...itemsToReplace: T[]): T[];
export function replace<T>(array: T[], startingIndex: number, deleteCount: number, ...itemsToReplace: T[]): T[] {
  const _startingIndex = arguments.length === 3 ? array.findIndex(start)
}
