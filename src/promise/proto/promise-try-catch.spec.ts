import { expect } from 'chai';
import 'mocha';

import './promise-try-catch';

describe('Promise Try Catch Proto Function', () => {
  it('should resolve when its resolved', done => {
    Promise.resolve('foo')
      .tryCatch()
      .then(([error, result]) => {
        expect(error).to.eq(null);
        expect(result).to.eq('foo');
        done();
      });
  });

  it('should reject when its rejected', done => {
    Promise.reject('foo')
      .tryCatch()
      .then(([error, result]) => {
        expect(error).to.eq('foo');
        expect(result).to.eq(null);
        done();
      });
  });
});
