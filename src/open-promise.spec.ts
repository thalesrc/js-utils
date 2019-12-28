import 'jest';

import { OpenPromise } from './open-promise';
import { noop } from './function/noop';

class CustomError {
  constructor(public message: string) {}
}

describe('Open Promise Class', () => {
  it('should resolve properly', done => {
    const op = new OpenPromise<number>();
    const startedAt = new Date().getTime();

    op.promise.then(value => {
      expect(new Date().getTime() - startedAt).toBeGreaterThan(49);
      expect(value).toBe(1);
      done();
    });

    setTimeout(() => {
      op.resolve(1);
    }, 50);
  });

  it('should reject properly', done => {
    const op = new OpenPromise<number>();

    op.promise
      .then(value => {
        throw new CustomError('bar');
      })
      .catch((err: CustomError) => {
        expect(err.message).toBe('foo');
        done();
      });

    setTimeout(() => {
      op.reject(new CustomError('foo'));
    }, 50);
  });

  it('should return resolved state properly', done => {
    const op = new OpenPromise<number>();

    expect(op.resolved).toBe(false);
    op.resolve(1);

    setTimeout(() => {
      expect(op.resolved).toBe(true);
      expect(op.rejected).toBe(false);
      done();
    }, 50);
  });

  it('should return rejected state properly', done => {
    const op = new OpenPromise<number>();
    op.promise.catch(noop);

    expect(op.rejected).toBe(false);
    op.reject(new CustomError('foo'));

    setTimeout(() => {
      expect(op.resolved).toBe(false);
      expect(op.rejected).toBe(true);
      done();
    }, 50);
  });

  it('should return finished state properly', done => {
    const op = new OpenPromise<number>();
    const op2 = new OpenPromise<number>();
    op2.promise.catch(noop);

    expect(op.finished).toBe(false);
    expect(op2.finished).toBe(false);
    op.resolve(1);
    op2.reject(new CustomError('foo'));

    setTimeout(() => {
      expect(op.finished).toBe(true);
      expect(op2.finished).toBe(true);
      done();
    }, 50);
  });

  it('should resolve when bound promise resolved', done => {
    const op = new OpenPromise<number>();
    const startedAt = new Date().getTime();

    op.promise.then(val => {
      expect(new Date().getTime() - startedAt).toBeGreaterThan(49);
      expect(val).toBe(1);
      done();
    });

    op.bindPromise(new Promise(resolve => setTimeout(resolve.bind(null, 1), 50)));
  });

  it('should reject when bound promise rejected', done => {
    const op = new OpenPromise<number>();
    const startedAt = new Date().getTime();

    op.promise
      .then(() => {
        throw new CustomError('bar');
      })
      .catch((err: CustomError) => {
        expect(new Date().getTime() - startedAt).toBeGreaterThan(49);
        expect(err.message).toBe('foo');
        done();
      });

    op.bindPromise(new Promise((resolve, reject) => setTimeout(reject.bind(null, new CustomError('foo')), 50)));
  });
});
