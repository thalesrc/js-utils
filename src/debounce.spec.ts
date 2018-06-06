import { expect } from 'chai';
import 'mocha';

import { debounce, debounceWithKey } from "./debounce";

class CustomError {
  constructor(public message: string) {}
}

describe('Debounce Function', () => {
  let foo = 0;
  function bar() {
    foo++;
  }

  beforeEach(() => {
    foo = 0;
  });

  it('should debounce functions', done => {
    debounce(bar);
    debounce(bar);

    debounce(bar)
      .then(() => {
        expect(foo).to.eq(1);
        done();
      });
  });

  it('should wait the debouncing time to execute function', done => {
    const started = new Date().getTime();

    debounce(bar).then(() => {
      expect(foo).to.eq(1);
      expect(new Date().getTime() - started).to.greaterThan(179);
      done();
    });
  });

  it('should debounce by given time', done => {
    const started = new Date().getTime();

    debounce(bar, 50)
      .then(() => {
        const executedIn = new Date().getTime() - started;

        expect(foo).to.eq(1);
        expect(executedIn).greaterThan(49);
        expect(executedIn).lessThan(55);

        done();
      });
  });

  it('should use passed this object', done => {
    const john = {x: 0};

    function baz() {
      this.x++;
    }

    debounce(baz, undefined, john)
      .then(() => {
        expect(john.x).to.eq(1);
        done();
      });
  });

  it('should use passed arguments', done => {
    let john;

    function baz(a, b) {
      john = a + b;
    }

    debounce(baz, undefined, undefined, 5, 3)
      .then(() => {
        expect(john).to.eq(8);
        done();
      });
  });

  it('should throw the callback error if thrown', done => {
    function baz() {
      throw new CustomError("baz error");
    }

    debounce(baz)
      .then(() => {
        throw new CustomError("couldn't catch error");
      })
      .catch(err => {
        expect(err.message).to.eq("baz error");
        done();
      });
  });
});
