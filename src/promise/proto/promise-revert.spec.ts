import { expect } from 'chai';
import 'mocha';

import './promise-revert';

class CustomError {
  constructor(public message: string) {}
}

describe('Promise Revert Proto Function', () => {
  it('should throw error when its resolved', done => {
    Promise.resolve('foo')
      .revert()
      .then(() => {
        throw new CustomError('bar');
      })
      .catch(err => {
        expect(err).to.eq('foo');
        done();
      });
  });

  it('should resolve when its rejected', done => {
    Promise.reject('foo')
      .revert()
      .then(res => {
        expect(res).to.eq('foo');
        done();
      });
  });
});
