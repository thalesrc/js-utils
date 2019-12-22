import 'jest';

import './try-catch';

describe('Promise Try Catch Proto Function', () => {
  it('should resolve when its resolved', done => {
    Promise.resolve('foo')
      .tryCatch()
      .then(([error, result]) => {
        expect(error).toBe(null);
        expect(result).toBe('foo');
        done();
      });
  });

  it('should reject when its rejected', done => {
    Promise.reject('foo')
      .tryCatch()
      .then(([error, result]) => {
        expect(error).toBe('foo');
        expect(result).toBe(null);
        done();
      });
  });
});
