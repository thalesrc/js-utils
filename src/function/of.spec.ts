import 'jest';

import { of } from './of';

describe('FunctionOf Function', () => {
  it('should create a function which returns given function', () => {
    const returnFoo = of('foo');
    const returnBar = of('bar');
    const fooResult = returnFoo();
    const barResult = returnBar();

    expect(fooResult).toBe('foo');
    expect(barResult).toBe('bar');
  });

  it('should cache created functions and should use from there', () => {
    const previouslyCreated = of('foo');

    expect(previouslyCreated).toBe(of('foo'));
    expect(of('foo')).toBe(of('foo'));
  });
});
