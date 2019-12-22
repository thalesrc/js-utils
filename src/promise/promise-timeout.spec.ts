import { expect } from 'chai';
import 'mocha';

import { promiseTimeout } from "./promise-timeout";

class CustomError {
  constructor(public message: string) {}
}

describe('Timeout Promise Function', () => {
  it('should resolve after 50ms', done => {
    const startedAt = new Date().getTime();

    promiseTimeout(50)
      .then(() => {
        expect(new Date().getTime() - startedAt).to.greaterThan(49);
        done();
      });
  });

  it('should resolve "foo" after 50ms', done => {
    const startedAt = new Date().getTime();

    promiseTimeout(50, "foo")
      .then(val => {
        expect(new Date().getTime() - startedAt).to.greaterThan(49);
        expect(val).to.eq("foo");
        done();
      });
  });

  it('should be able to cancel with own instance', done => {
    const timeout = promiseTimeout(100);

    timeout
      .then(() => {
        throw new CustomError("bar");
      })
      .catch(err => {
        expect(err).not.to.instanceof(CustomError);
        done();
      });

    promiseTimeout.cancel(timeout);
  });

  it('should be able to cancel with a key', done => {
    const key = Symbol();

    promiseTimeout(100, undefined, key)
      .then(() => {
        throw new CustomError("bar");
      })
      .catch(err => {
        expect(err).not.to.instanceof(CustomError);
        done();
      });

    promiseTimeout.cancel(key);
  });

  it('should throw default error when cancelled', done => {
    const key = Symbol();

    promiseTimeout(100, undefined, key)
      .then(() => {
        throw new CustomError("bar");
      })
      .catch(err => {
        expect(err).to.eql(promiseTimeout.TIMEOUT_CANCELLED);
        done();
      });

    promiseTimeout.cancel(key);
  });

  it('should throw related error when identifier not found', done => {
    const byKey = promiseTimeout.cancel(Symbol())
      .then(() => {
        throw new CustomError("foo");
      })
      .catch(err => {
        expect(err).to.eql(promiseTimeout.IDENTIFIER_NOT_FOUND);
      });

    const byPromise = promiseTimeout.cancel(Promise.resolve())
      .then(() => {
        throw new CustomError("foo");
      })
      .catch(err => {
        expect(err).to.eql(promiseTimeout.IDENTIFIER_NOT_FOUND);
      });

    Promise.all([byKey, byPromise]).then(() => {
      done();
    });
  });


  it('should throw related error when timeout finished already', done => {
    const resolved = promiseTimeout(10);
    const rejected = promiseTimeout(10);

    rejected.catch(() => {});

    promiseTimeout.cancel(rejected);

    setTimeout(() => {
      const _resolved = promiseTimeout.cancel(resolved)
        .then(() => {
          throw new CustomError("foo");
        })
        .catch(err => {
          expect(err).to.eql(promiseTimeout.FINISHED_ALREADY);
        });

      const _rejected = promiseTimeout.cancel(rejected)
        .then(() => {
          throw new CustomError("foo");
        })
        .catch(err => {
          expect(err).to.eql(promiseTimeout.FINISHED_ALREADY);
        });

      Promise.all([_resolved, _rejected]).then(() => {
        done();
      });
    }, 50);
  });

  it('should throw custom error when cancelling', done => {
    const timeout = promiseTimeout(100);

    timeout
      .then(() => {
        throw new CustomError("bar");
      })
      .catch(err => {
        expect(err).to.eq("foo");
        done();
      });

    promiseTimeout.cancel(timeout, "foo");
  });
});
