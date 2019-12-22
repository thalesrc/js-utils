import 'jest';

import { tryCatch } from './try-catch';

describe('AsyncTryCatch Function', () => {
  it('should resolve if promise resolved', done => {
    const foo = Promise.resolve('foo');

    tryCatch(foo).then(([err, res]) => {
      expect(err).toBe(null);
      expect(res).toBe('foo');
      done();
    });
  });

  it('should reject if promise rejected', done => {
    const foo = Promise.reject('error');

    tryCatch(foo).then(([err, res]) => {
      expect(err).toBe('error');
      expect(res).toBe(null);
      done();
    });
  });
});
