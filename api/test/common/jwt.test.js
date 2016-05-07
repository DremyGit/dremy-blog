const expect = require('chai').expect;
const jwt = require('../../common/jwt');

describe('Test common/jwt.js', () => {
  const obj = {
    id: 1,
    name: 'user'
  };
  const cert = 'secret';
  const objToken = jwt.create(obj, 10 * 1000, cert);
  it('Verify the true token', (done) => {
    jwt.verify(objToken, cert, (err, resObj) => {
      expect(err).to.be.null;
      expect(resObj).to.be.an('object');
      expect(resObj.name).to.equal(obj.name)
      done();
    });
  });

  it('Verify the error token', (done) => {
    jwt.verify(objToken, 'error', (err, resObj) => {
      expect(err.name).to.equal('JsonWebTokenError');
      done();
    });
  })
});
