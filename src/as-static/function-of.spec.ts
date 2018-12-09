import { expect } from 'chai';
import 'mocha';

import "./function-of";
import { functionOf } from "../function-of";

describe('Function Of Static Function', () => {
  it('should work as same', () => {
    const foo = functionOf('foo');
    const fooStatic = Function.of('foo');

    expect(foo).to.eql(fooStatic);
  });
});
