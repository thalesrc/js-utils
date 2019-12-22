import 'jest';

import { asyncMap } from './async-map';
import { timeout } from '../promise/timeout';

describe('AsyncMap Function', () => {
  it('should map asynchronous', done => {
    const foo = [1, 2, 3];

    asyncMap(foo, async value => timeout(Math.random() * 100).then(() => value + 1))
      .then(result => {
        expect(result).toEqual([2, 3, 4]);
        done();
      });
  });
});
