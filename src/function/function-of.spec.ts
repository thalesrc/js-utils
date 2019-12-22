import 'mocha';
import { expect } from 'chai';
import { functionOf } from "./function-of";

describe('FunctionOf Function', () => {
  it('should create a function which returns given function', () => {
    const returnFoo = functionOf("foo");
    const returnBar = functionOf("bar");
    const fooResult = returnFoo();
    const barResult = returnBar();

    expect(fooResult).to.eq("foo");
    expect(barResult).to.eq("bar");
  });

  it('should cache created functions and should use from there', () => {
    const previouslyCreated = functionOf('foo');

    expect(previouslyCreated).to.eq(functionOf('foo'));
    expect(functionOf('foo')).to.eq(functionOf('foo'));
  });
});