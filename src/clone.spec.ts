import { expect } from 'chai';
import 'mocha';

import { clone } from "./clone";

describe('Clone Function', () => {
  it('should clone primitives properly', () => {
    expect(clone(0)).to.eq(0);
    expect(clone(NaN)).to.eql(NaN);
    expect(clone("foo")).to.eq("foo");
    expect(clone(false)).to.eq(false);
    expect(clone(undefined)).to.eq(undefined);
    expect(clone(null)).to.eq(null);
  });

  it('should reference functions and symbols by default', () => {
    const sym = Symbol("foo");
    expect(clone(sym)).to.eq(sym);

    function foo() {}
    const bar = foo;

    expect(clone(foo)).to.eq(foo);
    expect(clone(bar)).to.eq(foo);
  });

  it('should clone object', () => {
    const foo = {x: 1, y: 2};
    const bar = clone(foo);

    expect(bar).not.to.eq(foo);
    expect(bar).to.eql(foo);
  });

  it('should clone array', () => {
    const foo = [1, 2];
    const bar = clone(foo);

    expect(bar).not.to.eq(foo);
    expect(bar).to.eql(foo);
  });

  it('should clone object deeply', () => {
    const foo = {x: 1, y: 2, z: {a: "a", b: "b"}, t: [1, 2]};
    const bar = clone(foo);

    expect(bar).to.eql(foo);

    expect(bar.z).not.to.eq(foo.z);
    expect(bar.z).to.eql(foo.z);

    expect(bar.t).not.to.eq(foo.t);
    expect(bar.t).to.eql(foo.t);
  });


  it('should clone array deeply', () => {
    const foo: any = [[1, 2], {a: 1, b: ["x", "y"]}];
    const bar = clone(foo);

    expect(bar).to.eql(foo);

    expect(bar[0]).not.to.eq(foo[0]);
    expect(bar[0]).to.eql(foo[0]);

    expect(bar[1]).not.to.eq(foo[1]);
    expect(bar[1]).to.eql(foo[1]);

    expect(bar[1].b).not.to.eq(foo[1].b);
    expect(bar[1].b).to.eql(foo[1].b);
  });

  it('should reference unwanted instances', () => {
    class Foo {}
    class Foo2 {}

    const bar = {x: new Foo(), y: new Foo(), z: new Foo2()};
    const baz = clone(bar, {instancesToRefer: [Foo, Foo2]});

    expect(baz).to.eql(bar);

    expect(baz.x).to.eq(bar.x);
    expect(baz.y).to.eq(bar.y);
    expect(baz.z).to.eq(bar.z);
  });

  it('should reference filtered values', () => {
    const foo = {a: {x: true}, b: {x: false}};
    const bar = clone(foo, {valueFiltererToRefer: value => value.x});

    expect(bar.a).to.eq(foo.a);
    expect(bar.b).not.to.eq(foo.b);
    expect(bar.b).to.eql(foo.b);
  });

  it('should reference unwanted properties', () => {
    const sym = Symbol();
    const foo = {a: {x: 1}, b: {x: 2}, [sym]: {x: 3}};
    const bar = clone(foo, {propsToRefer: ['a', sym]});

    expect(bar.a).to.eq(foo.a);

    expect(bar.b).not.to.eq(foo.b);
    expect(bar.b).to.eql(foo.b);

    expect(bar[sym]).to.eq(foo[sym]);
  });
});
