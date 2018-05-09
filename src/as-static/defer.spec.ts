import { expect } from 'chai';
import { fail } from 'assert';
import 'mocha';

import "./defer";

describe('Defer Static Function', () => {
  it('should defer execution', done => {
    let counter = 0;

    Promise.defer(() => {
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

    Promise.defer()
      .then(() => {
        expect(counter).to.eq(1);
        done();
      });
    counter++;
  });

  it('should return a promise which resolves after callback execution', done => {
    let counter = 0;
    Promise.defer(() => counter++)
      .then(() => {
        expect(counter).to.eq(1);
        done();
      });
    expect(counter).to.eq(0);
  });

  it('should return a promise which resolves the callback return value', done => {
    Promise.defer(() => "test")
      .then(value => {
        expect(value).to.eq("test");
        done();
      });
  });

  it('should catch callback errors', done => {
    Promise.defer(() => {throw new Error("abcd")})
      .then(value => {
        fail("couldn't catch error");
      })
      .catch((err: Error) => {
        expect(err.message).to.eq("abcd");
        done();
      });
  });
});
