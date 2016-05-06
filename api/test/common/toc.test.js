const expect = require('chai').expect;
const toc = require('../../common/toc');

const markdown1 = `
# title1
## title1-1
## title1-1
# title2
## title2-1
# title3
`;

const markdown2 = `
# title1
## title2
### title3
# title4
`;

describe('Test common/toc.js', () => {
  it('Generate a 2 level toc', () => {
    const result = toc(markdown1);
    expect(result.length).to.equal(3);
    expect(result[0].children.length).to.equal(2);
    expect(result[1].children[0].text).to.equal('title2-1');
  });
  it('Generate a 3 level toc', () => {
    const result = toc(markdown2);
    expect(result.length).to.equal(2);
    expect(result[0].children.length).to.equal(1);
    expect(result[0].children[0].children.length).to.equal(1);
  });

  it('Throw a error by error markdown', () => {
    expect(toc.bind(toc, "# h1\n### h3")).to.throw(/Markdown/);
    expect(toc.bind(toc, "## h2")).to.throw(/Markdown/);
  })
});