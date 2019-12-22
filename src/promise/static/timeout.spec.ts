import { expect } from 'chai';
import 'mocha';

import "./timeout";

class CustomError {
  constructor(public message: string) {}
}

describe('Promise Timeout Static Function', () => {
  it('should resolve after 50ms', done => {
    const startedAt = new Date().getTime();

    Promise.timeout(50)
      .then(() => {
        expect(new Date().getTime() - startedAt).to.greaterThan(49);
        done();
      });
  });

  it('should resolve "foo" after 50ms', done => {
    const startedAt = new Date().getTime();

    Promise.timeout(50, "foo")
      .then(val => {
        expect(new Date().getTime() - startedAt).to.greaterThan(49);
        expect(val).to.eq("foo");
        done();
      });
  });

  it('should be able to cancel with own instance', done => {
    const timeout = Promise.timeout(100);

    timeout
      .then(() => {
        throw new CustomError("bar");
      })
      .catch(err => {
        expect(err).not.to.instanceof(CustomError);
        done();
      });

    Promise.timeout.cancel(timeout);
  });

  it('should be able to cancel with a key', done => {
    const key = Symbol();

    Promise.timeout(100, undefined, key)
      .then(() => {
        throw new CustomError("bar");
      })
      .catch(err => {
        expect(err).not.to.instanceof(CustomError);
        done();
      });

    Promise.timeout.cancel(key);
  });

  it('should throw default error when cancelled', done => {
    const key = Symbol();

    Promise.timeout(100, undefined, key)
      .then(() => {
        throw new CustomError("bar");
      })
      .catch(err => {
        expect(err).to.eql(Promise.timeout.TIMEOUT_CANCELLED);
        done();
      });

    Promise.timeout.cancel(key);
  });

  it('should throw related error when identifier not found', done => {
    const byKey = Promise.timeout.cancel(Symbol())
      .then(() => {
        throw new CustomError("foo");
      })
      .catch(err => {
        expect(err).to.eql(Promise.timeout.IDENTIFIER_NOT_FOUND);
      });

    const byPromise = Promise.timeout.cancel(Promise.resolve())
      .then(() => {
        throw new CustomError("foo");
      })
      .catch(err => {
        expect(err).to.eql(Promise.timeout.IDENTIFIER_NOT_FOUND);
      });

    Promise.all([byKey, byPromise]).then(() => {
      done();
    });
  });


  it('should throw related error when timeout finished already', done => {
    const resolved = Promise.timeout(10);
    const rejected = Promise.timeout(10);

    rejected.catch(() => {});

    Promise.timeout.cancel(rejected);

    setTimeout(() => {
      const _resolved = Promise.timeout.cancel(resolved)
        .then(() => {
          throw new CustomError("foo");
        })
        .catch(err => {
          expect(err).to.eql(Promise.timeout.FINISHED_ALREADY);
        });

      const _rejected = Promise.timeout.cancel(rejected)
        .then(() => {
          throw new CustomError("foo");
        })
        .catch(err => {
          expect(err).to.eql(Promise.timeout.FINISHED_ALREADY);
        });

      Promise.all([_resolved, _rejected]).then(() => {
        done();
      });
    }, 50);
  });

  it('should throw custom error when cancelling', done => {
    const timeout = Promise.timeout(100);

    timeout
      .then(() => {
        throw new CustomError("bar");
      })
      .catch(err => {
        expect(err).to.eq("foo");
        done();
      });

    Promise.timeout.cancel(timeout, "foo");
  });
});
