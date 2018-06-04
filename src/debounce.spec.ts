import { expect } from 'chai';
import 'mocha';

import { debounce, debounceWithKey } from "./debounce";

let foo = 0;
function bar() {
  foo++;
}

describe('Debounce Function', () => {
  beforeEach(() => {
    foo = 0;
  });

  it('should debounce functions', done => {
    debounce(bar);
    debounce(bar);

    debounce(bar)
      .then(() => {
        expect(foo).to.eq(1);
        done();
      });
  });

  it('should wait the debouncing time to execute function', done => {
    const started = new Date().getTime();

    debounce(bar).then(() => {
      expect(new Date().getTime() - started).to.greaterThan(180);
      done();
    });
  });
});
