import 'jest';

import { clone } from './clone-2';

describe.only('Clone Function', () => {
  it('should clone primitives properly', () => {
    expect(clone(0)).toBe(0);
    expect(clone(NaN)).toEqual(NaN);
    expect(clone('foo')).toBe('foo');
    expect(clone(false)).toBe(false);
    expect(clone(undefined)).toBe(undefined);
    expect(clone(null)).toBe(null);
  });

  it('should reference functions and symbols by default', () => {
    const sym = Symbol('foo');
    expect(clone(sym)).toBe(sym);

    function foo() {}
    const bar = foo;

    expect(clone(foo)).toBe(foo);
    expect(clone(bar)).toBe(foo);
  });

  it('should clone object', () => {
    const foo = {x: 1, y: 2};
    const bar = clone(foo);

    expect(bar).not.toBe(foo);
    expect(bar).toEqual(foo);
  });

  it('should clone array', () => {
    const foo = [1, 2];
    const bar = clone(foo);

    expect(bar).not.toBe(foo);
    expect(bar).toEqual(foo);
  });

  it('should clone map', () => {
    const foo = new Map([['x', 1], ['y', 2]]);
    const bar = clone(foo);

    expect(bar).not.toBe(foo);
    expect(bar).toEqual(foo);
  });

  it('should clone set', () => {
    const foo = new Set(['a', 'b']);
    const bar = clone(foo);

    expect(bar).not.toBe(foo);
    expect(bar).toEqual(foo);
  });

  it('should clone object deeply', () => {
    const map = new Map();
    map.set(1, 'a');

    const foo = {x: 1, y: 2, z: {a: 'a', b: 'b'}, t: [1, 2], m: map};
    const bar = clone(foo);

    expect(bar).toEqual(foo);

    expect(bar.z).not.toBe(foo.z);
    expect(bar.z).toEqual(foo.z);

    expect(bar.t).not.toBe(foo.t);
    expect(bar.t).toEqual(foo.t);

    expect(bar.m).not.toBe(foo.m);
    expect(bar.m).toEqual(map);
  });


  it('should clone array deeply', () => {
    const foo: any = [[1, 2], {a: 1, b: ['x', 'y']}];
    const bar = clone(foo);

    expect(bar).toEqual(foo);

    expect(bar[0]).not.toBe(foo[0]);
    expect(bar[0]).toEqual(foo[0]);

    expect(bar[1]).not.toBe(foo[1]);
    expect(bar[1]).toEqual(foo[1]);

    expect(bar[1].b).not.toBe(foo[1].b);
    expect(bar[1].b).toEqual(foo[1].b);
  });

  it('should reference unwanted instances', () => {
    class Foo {}
    class Foo2 {}

    const bar = {x: new Foo(), y: new Foo(), z: new Foo2()};
    const baz = clone(bar, ({value, keepSame}) => {
      if (value instanceof Foo) {
        return keepSame();
      }
    });

    expect(baz).toEqual(bar);

    expect(baz.x).toBe(bar.x);
    expect(baz.y).toBe(bar.y);
    expect(baz.z).not.toBe(bar.z);
  });

  it('should reference filtered values', () => {
    const foo = {a: {x: true}, b: {x: false}};
    const bar = clone(foo, ({value, keepSame}) => {
      if (typeof value === 'object' && value.x) {
        return keepSame();
      }
    });

    expect(bar.a).toBe(foo.a);
    expect(bar.b).not.toBe(foo.b);
    expect(bar.b).toEqual(foo.b);
  });

  it('should reference unwanted properties', () => {
    const sym = Symbol();
    const anObjKey = {};
    const map = new Map();
    map.set(anObjKey, {x: 5});

    const foo = {a: {x: 1}, b: {x: 2}, [sym]: {x: 3}, c: [{x: 3}, {x: 4}], d: map};
    const bar = clone(foo, ({key, keepSame}) => {
      if (['a', sym, 1, anObjKey].some(k => k === key)) {
        return keepSame();
      }
    });

    expect(bar.a).toBe(foo.a);

    expect(bar.b).not.toBe(foo.b);
    expect(bar.b).toEqual(foo.b);

    expect(bar[sym]).toBe(foo[sym]);

    expect(bar.c[0]).not.toBe(foo.c[0]);
    expect(bar.c[1]).toBe(foo.c[1]);

    expect(bar.d.get(anObjKey)).toBe(foo.d.get(anObjKey));
  });

  it('should clone via custom cloner', () => {
    class A {
      public customCloned = false;
    }

    function aCloner<T>(object: T, options, internal): T {
      const obj = new A();
      obj.customCloned = true;
      return obj as any;
    }

    const foo = [new A()];
    const bar = clone(foo, ({value, syncClone}) => {
      if (value instanceof A) {
        return syncClone(() => {
          const obj = new A();
          obj.customCloned = true;

          return obj;
        });
      }
    });

    expect(bar[0].customCloned).toBe(true);
  });

  it('should overcome circular reference', () => {
    const foo: {[key: string]: any} = {};
    const bar: {[key: string]: any} = {};
    const x: {[key: string]: any} = {};
    foo.bar = bar;
    foo.x = x;
    x.bar = bar;
    foo.foo = foo;

    const baz = clone(foo);

    expect(baz.foo).toBe(baz);
    expect(baz.foo.bar).toBe(baz.bar);
    expect(baz.foo.x.bar).toBe(baz.bar);
  });
});
