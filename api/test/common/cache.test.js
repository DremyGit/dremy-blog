const expect = require('chai').expect;
const cache = require('../../common/cache');

describe('Test common/cache.js', () => {
  const testObj= {
    id: 'test-' + Math.random()
  };
  const testObjExp = {
    id: 'test-exp-' + Math.random()
  };
  describe('Test cache.set()', () => {
    it('Create a non-exp cache', done => {
      cache.set('test', testObj, (err, res) => {
        expect(err).to.be.null;
        expect(res).to.equal('OK');
        done();
      });
    });
    it('Create a expire cache', done => {
      cache.set('test-exp', testObjExp, 1).then(res => {
        expect(res).to.equal('OK');
        done();
      });
    });
  });

  describe('Test cache.get()', () => {
    it('Get the created cache', done => {
      cache.get('test', (err, res) => {
        expect(err).to.be.null;
        expect(res).to.not.null;
        expect(res.id).to.equal(testObj.id);
        done();
      });
    });
    it('Get the cache by Promise', done => {
      cache.get('test').then(res => {
        expect(res).to.not.null;
        expect(res.id).to.equal(testObj.id);
        done();
      })
    });
    it('Get a non-existent cache', done => {
      cache.get('test-' + Math.random(), (err, res) => {
        expect(err).to.be.null;
        expect(res).to.be.null;
        done();
      });
    });
    it('Get the expire cache', done => {
      cache.get('test-exp', (err, res) => {
        expect(err).to.be.null;
        expect(res.id).to.equal(testObjExp.id);
        done();
      });
    });
    it('Can\'t get the expired cache', done => {
      setTimeout(() => {
        cache.get('test-exp', (err, res) => {
          expect(res).to.be.null;
          done();
        });
      }, 1200)
    });
  });

  describe('Test cache.del()', () => {
    it('Delete the cache', done => {
      cache.del('test').then(res => {
        expect(res).to.equal(1);
        done();
      });
    });
    it('Delete a non-existent cache', done => {
      cache.del('test-exp', (err, res) => {
        expect(res).to.equal(0);
        done();
      })
    });
  })
});

