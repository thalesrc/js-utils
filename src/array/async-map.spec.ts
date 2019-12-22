import 'mocha';
import { expect } from 'chai';
import { asyncMap } from "./async-map";
import { promiseTimeout } from "../promise/promise-timeout";

describe('AsyncMap Function', () => {
  it('should map asynchronous', done => {
    const foo = [1, 2, 3];

    asyncMap(foo, async value => promiseTimeout(Math.random() * 100).then(() => value + 1))
      .then(result => {
        expect(result).to.eql([2, 3, 4]);
        done();
      });
  });
});