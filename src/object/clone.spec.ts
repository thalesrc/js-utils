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

  it('should clone map', () => {
    const foo = new Map([["x", 1], ["y", 2]]);
    const bar = clone(foo);

    expect(bar).not.to.eq(foo);
    expect(bar).to.eql(foo);
  });

  it('should clone set', () => {
    const foo = new Set(["a", "b"]);
    const bar = clone(foo);

    expect(bar).not.to.eq(foo);
    expect(bar).to.eql(foo);
  });

  it('should clone object deeply', () => {
    const map = new Map();
    map.set(1, "a");

    const foo = {x: 1, y: 2, z: {a: "a", b: "b"}, t: [1, 2], m: map};
    const bar = clone(foo);

    expect(bar).to.eql(foo);

    expect(bar.z).not.to.eq(foo.z);
    expect(bar.z).to.eql(foo.z);

    expect(bar.t).not.to.eq(foo.t);
    expect(bar.t).to.eql(foo.t);

    expect(bar.m).not.to.eq(foo.m);
    expect(bar.m).to.eql(map);
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
    const anObjKey = {};
    const map = new Map();
    map.set(anObjKey, {x: 5});

    const foo = {a: {x: 1}, b: {x: 2}, [sym]: {x: 3}, c: [{x: 3}, {x: 4}], d: map};
    const bar = clone(foo, {propsToRefer: ['a', sym, 1, anObjKey]});

    expect(bar.a).to.eq(foo.a);

    expect(bar.b).not.to.eq(foo.b);
    expect(bar.b).to.eql(foo.b);

    expect(bar[sym]).to.eq(foo[sym]);

    expect(bar.c[0]).not.to.eq(foo.c[0]);
    expect(bar.c[1]).to.eq(foo.c[1]);

    expect(bar.d.get(anObjKey)).to.eq(foo.d.get(anObjKey));
  });

  it("should clone via custom cloner", () => {
    class A {
      public customCloned = false;
    }

    function aCloner<T>(object: T, options, internal): T {
      const obj = new A();
      obj.customCloned = true;
      return obj as any;
    }

    const foo = [new A()];
    const bar = clone(foo, {customCloners: new Map([[A, aCloner]])});

    expect(bar[0].customCloned).to.eq(true);
  });

  it("should overcome circular reference", () => {
    const foo: {[key: string]: any} = {};
    const bar: {[key: string]: any} = {};
    const x: {[key: string]: any} = {};
    foo.bar = bar;
    foo.x = x;
    x.bar = bar;
    foo.foo = foo;

    const baz = clone(foo);

    expect(baz.foo).to.eq(baz);
    expect(baz.foo.bar).to.eq(baz.bar);
    expect(baz.foo.x.bar).to.eq(baz.bar);
  });
});
