import 'jest';

import './defer';

class CustomError {
  constructor(public message: string) {}
}

describe('Defer Static Function', () => {
  it('should defer execution', done => {
    let counter = 0;

    Function.defer(() => {
      expect(counter).toBe(1000000);
      done();
    });

    expect(counter).toBe(0);

    for (let i = 0; i < 1000000; i++) {
      counter++;
    }
  });

  it('should return a deferred void promise if callback is not defined', done => {
    let counter = 0;

    Function.defer()
      .then(() => {
        expect(counter).toBe(1);
        done();
      });
    counter++;
  });

  it('should return a promise which resolves after callback execution', done => {
    let counter = 0;
    Function.defer(() => counter++)
      .then(() => {
        expect(counter).toBe(1);
        done();
      });
    expect(counter).toBe(0);
  });

  it('should return a promise which resolves the callback return value', done => {
    Function.defer(() => 'test')
      .then(value => {
        expect(value).toBe('test');
        done();
      });
  });

  it('should catch callback errors', done => {
    Function.defer(() => {
      throw new CustomError('foo');
    })
      .then(value => {
        throw new CustomError("couldn't catch error");
      })
      .catch((err: CustomError) => {
        expect(err.message).toBe('foo');
        done();
      });
  });
});
