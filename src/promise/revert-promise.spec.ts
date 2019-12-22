import { expect } from 'chai';
import 'mocha';

import { revertPromise } from "./revert-promise";

class CustomError {
  constructor(public message: string) {}
}

describe('Promise Revert Function', () => {
  it('should throw error when its resolved', done => {
    revertPromise(Promise.resolve("foo"))
      .then(() => {
        throw new CustomError("bar");
      })
      .catch(err => {
        expect(err).to.eq("foo");
        done();
      });
  });

  it('should resolve when its rejected', done => {
    revertPromise(Promise.reject("foo"))
      .then(res => {
        expect(res).to.eq("foo");
        done();
      });
  });
});
