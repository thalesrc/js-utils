import 'mocha';
import { expect } from 'chai';
import { of } from "./of";

describe('FunctionOf Function', () => {
  it('should create a function which returns given function', () => {
    const returnFoo = of("foo");
    const returnBar = of("bar");
    const fooResult = returnFoo();
    const barResult = returnBar();

    expect(fooResult).to.eq("foo");
    expect(barResult).to.eq("bar");
  });

  it('should cache created functions and should use from there', () => {
    const previouslyCreated = of('foo');

    expect(previouslyCreated).to.eq(of('foo'));
    expect(of('foo')).to.eq(of('foo'));
  });
});