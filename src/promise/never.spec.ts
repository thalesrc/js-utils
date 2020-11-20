import 'jest';

import { never, NEVER } from './never';
import { timeout } from './timeout';

describe('Never Function', () => {
  it('should not resolve', done => {
    const foo = never();

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
    const foo = never();

    expect(foo).toBe(NEVER);
  });
});

describe('Never Constant', () => {
  it('should not resolve', done => {
    NEVER.then(() => {
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
