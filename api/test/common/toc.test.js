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
#### title4
## title5
`;

describe('Test common/toc.js', () => {
  it('Generate a 2 level toc', () => {
    const result = toc(markdown1);
    expect(result.length).to.equal(3);
    expect(result[0].children.length).to.equal(2);
    expect(result[1].children[0].text).to.equal('title2-1');
  });
  it('Generate a 4 level toc', () => {
    const result = toc(markdown2);
    expect(result.length).to.equal(1);
    expect(result[0].children.length).to.equal(2);
    expect(result[0].children[0].children[0].children.length).to.equal(1);
    expect(result[0].children[1].text).to.equal('title5');
  });

  it('Throw a error by error markdown', () => {
    expect(toc("# h1\n### h3")).to.be.empty;
    expect(toc("## h2")).to.be.empty;
    expect(toc("# h1\n##h2\n### h3\n#### h4\n## h2\n#### h4")).to.be.empty;
  })
});