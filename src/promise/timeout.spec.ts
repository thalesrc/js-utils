import { expect } from 'chai';
import 'mocha';

import { timeout } from "./timeout";

class CustomError {
  constructor(public message: string) {}
}

describe('Timeout Promise Function', () => {
  it('should resolve after 50ms', done => {
    const startedAt = new Date().getTime();

    timeout(50)
      .then(() => {
        expect(new Date().getTime() - startedAt).to.greaterThan(49);
        done();
      });
  });

  it('should resolve "foo" after 50ms', done => {
    const startedAt = new Date().getTime();

    timeout(50, "foo")
      .then(val => {
        expect(new Date().getTime() - startedAt).to.greaterThan(49);
        expect(val).to.eq("foo");
        done();
      });
  });

  it('should be able to cancel with own instance', done => {
    const timeout = timeout(100);

    timeout
      .then(() => {
        throw new CustomError("bar");
      })
      .catch(err => {
        expect(err).not.to.instanceof(CustomError);
        done();
      });

    timeout.cancel(timeout);
  });

  it('should be able to cancel with a key', done => {
    const key = Symbol();

    timeout(100, undefined, key)
      .then(() => {
        throw new CustomError("bar");
      })
      .catch(err => {
        expect(err).not.to.instanceof(CustomError);
        done();
      });

    timeout.cancel(key);
  });

  it('should throw default error when cancelled', done => {
    const key = Symbol();

    timeout(100, undefined, key)
      .then(() => {
        throw new CustomError("bar");
      })
      .catch(err => {
        expect(err).to.eql(timeout.TIMEOUT_CANCELLED);
        done();
      });

    timeout.cancel(key);
  });

  it('should throw related error when identifier not found', done => {
    const byKey = timeout.cancel(Symbol())
      .then(() => {
        throw new CustomError("foo");
      })
      .catch(err => {
        expect(err).to.eql(timeout.IDENTIFIER_NOT_FOUND);
      });

    const byPromise = timeout.cancel(Promise.resolve())
      .then(() => {
        throw new CustomError("foo");
      })
      .catch(err => {
        expect(err).to.eql(timeout.IDENTIFIER_NOT_FOUND);
      });

    Promise.all([byKey, byPromise]).then(() => {
      done();
    });
  });


  it('should throw related error when timeout finished already', done => {
    const resolved = timeout(10);
    const rejected = timeout(10);

    rejected.catch(() => {});

    timeout.cancel(rejected);

    setTimeout(() => {
      const _resolved = timeout.cancel(resolved)
        .then(() => {
          throw new CustomError("foo");
        })
        .catch(err => {
          expect(err).to.eql(timeout.FINISHED_ALREADY);
        });

      const _rejected = timeout.cancel(rejected)
        .then(() => {
          throw new CustomError("foo");
        })
        .catch(err => {
          expect(err).to.eql(timeout.FINISHED_ALREADY);
        });

      Promise.all([_resolved, _rejected]).then(() => {
        done();
      });
    }, 50);
  });

  it('should throw custom error when cancelling', done => {
    const timeout = timeout(100);

    timeout
      .then(() => {
        throw new CustomError("bar");
      })
      .catch(err => {
        expect(err).to.eq("foo");
        done();
      });

    timeout.cancel(timeout, "foo");
  });
});
