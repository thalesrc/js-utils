import { expect } from 'chai';
import { fail } from 'assert';
import 'mocha';

import { defer } from "./defer";

class CustomError {
  constructor(public message: string) {}
}

describe('Defer Function', () => {
  it('should defer execution', done => {
    let counter = 0;

    defer(() => {
      expect(counter).to.eq(1000000);
      done();
    });

    expect(counter).to.eq(0);

    for (let i = 0; i < 1000000; i++) {
      counter++;
    }
  });

  it('should return a deferred void promise if callback is not defined', done => {
    let counter = 0;

    defer()
      .then(() => {
        expect(counter).to.eq(1);
        done();
      });
    counter++;
  });

  it('should return a promise which resolves after callback execution', done => {
    let counter = 0;
    defer(() => counter++)
      .then(() => {
        expect(counter).to.eq(1);
        done();
      });
    expect(counter).to.eq(0);
  });

  it('should return a promise which resolves the callback return value', done => {
    defer(() => "test")
      .then(value => {
        expect(value).to.eq("test");
        done();
      });
  });

  it('should catch callback errors', done => {
    Promise.defer(() => {
      throw new CustomError("foo");
    })
      .then(value => {
        throw new CustomError("couldn't catch error");
      })
      .catch((err: CustomError) => {
        expect(err.message).to.eq("foo");
        done();
      });
  });
});
