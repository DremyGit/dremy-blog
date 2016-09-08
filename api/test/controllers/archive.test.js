const expect = require('chai').expect;
const request = require('supertest');
const helper = require('../helper');
const app = require('../../app');
const cache = require('../../common/cache');

describe('Test controller/archive.js', () => {

  const agent = request.agent(app);
  const testBlog1 = {
    title: 'test' + Math.random(),
    code: 'test' + Math.random(),
  };
  const testBlog2 = {
    title: 'test' + Math.random(),
    code: 'test' + Math.random(),
  };
  const now = new Date();

  before(done => {
    helper.clear('blogs', () => {
      cache.del('archives').then(() => {
        return cache.del(`archives:${now.getFullYear()}:${now.getMonth() + 1}`)
      }).then(() => {
        agent.post('/blogs').set(helper.adminHeader()).send(testBlog1).expect(res => {
          expect(res.body._id.length).to.equal(24);
          testBlog1._id = res.body._id;
        }).end(() => {
          agent.post('/blogs').set(helper.adminHeader()).send(testBlog2).expect(res => {
            expect(res.body._id.length).to.equal(24);
            testBlog2._id = res.body._id;
          }).end(done);
        });
      });
    });
  });

  describe('Get /archives', () => {
    it('Get archives', done => {
      agent.get('/archives').expect(200).expect(res => {
        expect(res.body.length).to.equal(1);
        expect(res.body[0].blogs.length).to.equal(2);
      }).end(done);
    });
  });

  describe('Get /archives/:year/:month/blogs', () => {
    it('Get blogs by created date', done => {
      agent.get(`/archives/${now.getFullYear()}/${now.getMonth()+1}/blogs`)
        .expect(200)
        .expect(res => {
          expect(res.body.length).to.equal(2);
          expect(res.body[1]._id).to.equal(testBlog1._id);
          expect(res.body[0]._id).to.equal(testBlog2._id);
        }).end(done);
    });
    it('Get blogs again and hit cache', done => {
      agent.get(`/archives/${now.getFullYear()}/${now.getMonth()+1}/blogs`)
        .expect(200)
        .expect(res => {
          expect(res.body.length).to.equal(2);
        }).end(done);
    });
    it('Get blogs by a non-exist date', done => {
      agent.get(`/archives/${now.getFullYear()+1}/${now.getMonth()+1}/blogs`)
        .expect(404)
        .end(done);
    })
  });
  after(done => {
    cache.del('archives').then(() => {
      return cache.del(`archives:${now.getFullYear()}:${now.getMonth()+1}`)
    }).then(() => done());
  })
});