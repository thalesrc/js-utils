import 'jest';

import './never';

import { timeout } from '../timeout';

describe('Never Function', () => {
  it('should not resolve', done => {
    const foo = Promise.never();

    foo.then(() => {
      throw new Error();
    }, () => {
      throw new Error();
    });

    timeout(50)
      .then(() => {
        done();
      });
  });

  it('should return the same `NEVER` instance', () => {
    const foo = Promise.never();

    expect(foo).toBe(Promise.NEVER);
  });
});

describe('Never Constant', () => {
  it('should not resolve', done => {
    Promise.NEVER.then(() => {
      throw new Error();
    }, () => {
      throw new Error();
    });

    timeout(50)
      .then(() => {
        done();
      });
  });
});
