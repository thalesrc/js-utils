import { expect } from 'chai';
import 'mocha';

import { OpenPromise } from './open-promise';
import { noop } from './noop';

class CustomError {
  constructor(public message: string) {}
}

describe('Open Promise Class', () => {
  it('should resolve properly', done => {
    const op = new OpenPromise<number>();
    const startedAt = new Date().getTime();

    op.promise.then(value => {
      expect(new Date().getTime() - startedAt).to.greaterThan(49);
      expect(value).to.eq(1);
      done();
    });

    setTimeout(() => {
      op.resolve(1);
    }, 50);
  });

  it('should reject properly', done => {
    const op = new OpenPromise<number>();
    const startedAt = new Date().getTime();

    op.promise
      .then(value => {
        throw new CustomError('bar');
      })
      .catch((err: CustomError) => {
        expect(new Date().getTime() - startedAt).to.greaterThan(49);
        expect(err.message).to.eq('foo');
        done();
      });

    setTimeout(() => {
      op.reject(new CustomError('foo'));
    }, 50);
  });

  it('should return resolved state properly', done => {
    const op = new OpenPromise<number>();

    expect(op.resolved).to.eq(false);
    op.resolve(1);

    setTimeout(() => {
      expect(op.resolved).to.eq(true);
      expect(op.rejected).to.eq(false);
      done();
    }, 50);
  });

  it('should return rejected state properly', done => {
    const op = new OpenPromise<number>();
    op.promise.catch(noop);

    expect(op.rejected).to.eq(false);
    op.reject(new CustomError('foo'));

    setTimeout(() => {
      expect(op.resolved).to.eq(false);
      expect(op.rejected).to.eq(true);
      done();
    }, 50);
  });

  it('should return finished state properly', done => {
    const op = new OpenPromise<number>();
    const op2 = new OpenPromise<number>();
    op2.promise.catch(noop);

    expect(op.finished).to.eq(false);
    expect(op2.finished).to.eq(false);
    op.resolve(1);
    op2.reject(new CustomError('foo'));

    setTimeout(() => {
      expect(op.finished).to.eq(true);
      expect(op2.finished).to.eq(true);
      done();
    }, 50);
  });

  it('should resolve when bound promise resolved', done => {
    const op = new OpenPromise<number>();
    const startedAt = new Date().getTime();

    op.promise.then(val => {
      expect(new Date().getTime() - startedAt).to.greaterThan(49);
      expect(val).to.eq(1);
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
        expect(new Date().getTime() - startedAt).to.greaterThan(49);
        expect(err.message).to.eq('foo');
        done();
      });

    op.bindPromise(new Promise((resolve, reject) => setTimeout(reject.bind(null, new CustomError('foo')), 50)));
  });
});
