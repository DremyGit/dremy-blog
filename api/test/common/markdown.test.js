const marked = require('../../common/markdown');
const expect = require('chai').expect;

describe('Test common/markdown.js', () => {

  describe('Heading parse', () => {
    it('English heading', () => {
      const text = '# Hello world';
      const expText = '<h2 id="hello-world">Hello world</h2>';
      expect(marked(text)).to.equal(expText);
    });

    it('Chinese heading', () => {
      const text = '# 标题一';
      const expText = '<h2 id="标题一">标题一</h2>';
      expect(marked(text)).to.equal(expText);
    });

    it('Hybrid heading', () => {
      const text = '# 1.标题A';
      const expText = '<h2 id="1-标题a">1.标题A</h2>';
      expect(marked(text)).to.equal(expText);
    });
  });
});