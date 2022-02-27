import 'jest';

import { tryOneByOne } from './try-one-by-one';

class CustomError {
  constructor(public message: string) {}
}

describe('TryOneByOne Function', () => {
  it('should resolve if a promise resolved', done => {
    tryOneByOne([Promise.resolve('foo')])
      .then(res => {
        expect(res).toBe('foo');
        done();
      })
      .catch(err => {
        throw new CustomError("didn't resolve");
      });
  });

  it('should try the next promise when the first threw error', done => {
    tryOneByOne([
      Promise.reject('foo'),
      Promise.resolve('bar'),
    ])
      .then(res => {
        expect(res).toBe('bar');
        done();
      })
      .catch(err => {
        throw new CustomError("didn't resolve");
      });
  });
});
