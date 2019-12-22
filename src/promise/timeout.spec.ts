import 'jest';

import { timeout } from './timeout';

class CustomError {
  constructor(public message: string) {}
}

describe('Timeout Promise Function', () => {
  it('should resolve after 50ms', done => {
    const startedAt = new Date().getTime();

    timeout(50)
      .then(() => {
        expect(new Date().getTime() - startedAt).toBeGreaterThan(49);
        done();
      });
  });

  it('should resolve "foo" after 50ms', done => {
    const startedAt = new Date().getTime();

    timeout(50, 'foo')
      .then(val => {
        expect(new Date().getTime() - startedAt).toBeGreaterThan(49);
        expect(val).toBe('foo');
        done();
      });
  });

  it('should be able to cancel with own instance', done => {
    const timeoutPromise = timeout(100);

    timeoutPromise
      .then(() => {
        throw new CustomError('bar');
      })
      .catch(err => {
        expect(err).not.toBeInstanceOf(CustomError);
        done();
      });

    timeout.cancel(timeoutPromise);
  });

  it('should be able to cancel with a key', done => {
    const key = Symbol();

    timeout(100, undefined, key)
      .then(() => {
        throw new CustomError('bar');
      })
      .catch(err => {
        expect(err).not.toBeInstanceOf(CustomError);
        done();
      });

    timeout.cancel(key);
  });

  it('should throw default error when cancelled', done => {
    const key = Symbol();

    timeout(100, undefined, key)
      .then(() => {
        throw new CustomError('bar');
      })
      .catch(err => {
        expect(err).toEqual(timeout.TIMEOUT_CANCELLED);
        done();
      });

    timeout.cancel(key);
  });

  it('should throw related error when identifier not found', done => {
    const byKey = timeout.cancel(Symbol())
      .then(() => {
        throw new CustomError('foo');
      })
      .catch(err => {
        expect(err).toEqual(timeout.IDENTIFIER_NOT_FOUND);
      });

    const byPromise = timeout.cancel(Promise.resolve())
      .then(() => {
        throw new CustomError('foo');
      })
      .catch(err => {
        expect(err).toEqual(timeout.IDENTIFIER_NOT_FOUND);
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
          throw new CustomError('foo');
        })
        .catch(err => {
          expect(err).toEqual(timeout.FINISHED_ALREADY);
        });

      const _rejected = timeout.cancel(rejected)
        .then(() => {
          throw new CustomError('foo');
        })
        .catch(err => {
          expect(err).toEqual(timeout.FINISHED_ALREADY);
        });

      Promise.all([_resolved, _rejected]).then(() => {
        done();
      });
    }, 50);
  });

  it('should throw custom error when cancelling', done => {
    const timeoutPromise = timeout(100);

    timeoutPromise
      .then(() => {
        throw new CustomError('bar');
      })
      .catch(err => {
        expect(err).toBe('foo');
        done();
      });

    timeout.cancel(timeoutPromise, 'foo');
  });
});
