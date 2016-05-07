const expect = require('chai').expect;
const cache = require('../../common/cache');

describe('Test common/cache.js', () => {

  const testObj = {
    id: 'test-' + Math.random()
  };
  const testObj2 = {
    id: 'test-ttl-' + Math.random()
  };

  const throwE = (e) => {console.log(e);throw e};
  it('Create a cache', done => {
    cache.set('test', testObj).then(res => {
      expect(res).to.equal('OK');
      done();
    }).catch(throwE)
  });
  it('Get the cache', done => {
    cache.get('test').then(res => {
      expect(res).to.not.undefined;
      expect(res.id).to.equal(testObj.id);
      done();
    }).catch(throwE);
  });
  it('Create a ttl cache', done => {
    cache.set('test-ttl', testObj2, 1).then(res => {
      expect(res).to.equal('OK');
      done();
    }).catch(throwE);
  });
  it('Get the ttl cache', done => {
    cache.get('test-ttl').then(res => {
      expect(res).to.not.undefined;
      expect(res.id).to.equal(testObj2.id);
      done();
    }).catch(throwE);
  });
  it('Can\'t get the expire cache', done => {
    setTimeout(() => {
      cache.get('test-ttl').then(res => {
        expect(res).to.be.undefined;
        done();
      }).catch(throwE)
    }, 1200)
  })
});

