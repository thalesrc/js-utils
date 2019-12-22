export function merge<T, U, V, Y>(first: Map<T, U>, second: Map<V, Y>): Map<T | V, U | Y> {
  const newMap = new Map<T | V, U | Y>(first);

  Array.from(second.keys()).forEach(key => {
    newMap.set(key, second.get(key));
  });

  return newMap;
}
