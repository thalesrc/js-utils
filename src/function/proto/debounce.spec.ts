import 'jest';

import './debounce';

describe('Debounce Proto Function', () => {
  it('should debounce', done => {
    let bar = 0;
    function foo() {
      bar++;
    }

    foo.debounce();
    foo.debounce();
    foo.debounce();

    foo.debounce().then(() => {
      expect(bar).toBe(1);
      done();
    });
  });

  it('should work as same', done => {
    let bar = {x: 0};

    function foo(a, b) {
      this.x = a + b;
    }

    const startedAt = new Date().getTime();

    foo.debounce(50, bar, 0, 0)
      .then(() => {
        const sequence = new Date().getTime() - startedAt;
        expect(sequence).toBeGreaterThan(49);
        expect(sequence).toBeLessThan(60);

        expect(bar.x).toBe(8);

        done();
      });

    foo.debounce(50, bar, 0, 0);
    foo.debounce(50, bar, 0, 0);
    foo.debounce(50, bar, 5, 3);
  });
});
