import { expect } from 'chai';
import 'mocha';

import { uniqueId } from "./unique-id";

describe('Unique Id Function', () => {
  it('should return a unique number on every call', () => {
    const idSet = [];
    for (let i = 0; i < 100; i++) {
      const id = uniqueId();
      expect(idSet).not.includes(id);
      idSet.push(id);
    }
  });

  it('should start a new counter for each unique prefix', () => {
    expect(uniqueId("foo")).to.eq("foo-0");
    expect(uniqueId("bar")).to.eq("bar-0");
    expect(uniqueId("baz")).to.eq("baz-0");

    expect(uniqueId("foo")).to.eq("foo-1");
    expect(uniqueId("bar")).to.eq("bar-1");
    expect(uniqueId("baz")).to.eq("baz-1");
  });
});
