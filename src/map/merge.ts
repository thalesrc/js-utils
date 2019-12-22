export function merge<T, U, V, Y>(first: Map<T, U>, second: Map<V, Y>): Map<T | V, U | Y> {
  const newMap = new Map<T | V, U | Y>(first);

  for (const key of second.keys()) {
    newMap.set(key, second.get(key));
  }

  return newMap;
}
