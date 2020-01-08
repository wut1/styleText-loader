import src from '../src';
import cjs from '../src/cjs';

describe('cjs', () => {
  it('应该输出', () => {
    expect(cjs).toEqual(src);
  });
});
