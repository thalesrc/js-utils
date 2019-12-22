import 'jest';

import { revert } from './revert';

class CustomError {
  constructor(public message: string) {}
}

describe('Promise Revert Function', () => {
  it('should throw error when its resolved', done => {
    revert(Promise.resolve('foo'))
      .then(() => {
        throw new CustomError('bar');
      })
      .catch(err => {
        expect(err).toBe('foo');
        done();
      });
  });

  it('should resolve when its rejected', done => {
    revert(Promise.reject('foo'))
      .then(res => {
        expect(res).toBe('foo');
        done();
      });
  });
});
