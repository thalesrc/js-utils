import 'mocha';
import { expect } from 'chai';
import { tryCatch } from './try-catch';

describe('AsyncTryCatch Function', () => {
  it('should resolve if promise resolved', done => {
    const foo = Promise.resolve('foo');

    tryCatch(foo).then(([err, res]) => {
      expect(err).to.eq(null);
      expect(res).to.eq('foo');
      done();
    });
  });

  it('should reject if promise rejected', done => {
    const foo = Promise.reject('error');

    tryCatch(foo).then(([err, res]) => {
      expect(err).to.eq('error');
      expect(res).to.eq(null);
      done();
    });
  });
});
