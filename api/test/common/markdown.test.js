const marked = require('../../common/markdown');
const expect = require('chai').expect;

describe('Test common/markdown.js', () => {

  describe('Heading parse', () => {
    it('English heading', () => {
      const text = '# Hello world';
      const expText = '<h1 id="hello-world">Hello world</h1>';
      expect(marked(text)).to.equal(expText);
    });

    it('Chinese heading', () => {
      const text = '# 标题一';
      const expText = '<h1 id="标题一">标题一</h1>';
      expect(marked(text)).to.equal(expText);
    });

    it('Hybrid heading', () => {
      const text = '# 1.标题A';
      const expText = '<h1 id="1-标题a">1.标题A</h1>';
      expect(marked(text)).to.equal(expText);
    });
  });
  describe('Link parse', () => {
    it('External links have target="_blank":', () => {
      const text = '[link](http://example.com)';
      const expText = '<p><a href="http://example.com" target="_blank">link</a></p>\n';
      expect(marked(text)).to.equal(expText)
    });
    it('Inside links have no target="_blank": ', () => {
      const text = '[link](/blog/test)';
      const expText = '<p><a href="/blog/test">link</a></p>\n';
      expect(marked(text)).to.equal(expText)
    })
  })
});