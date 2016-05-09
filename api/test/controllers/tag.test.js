const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');
const helper = require('../helper');
const cache = require('../../common/cache');

describe('Test controllers/tag.js', () => {
  const agent = request.agent(app);
  const testTag = {
    code: 'test',
    name: 'test-tag'
  };
  before(done => {
    helper.clear('tags', done);
  });
  describe('POST /tags', () => {
    it('Create a tag', done => {
      agent
        .post('/tags')
        .set(helper.adminHeader())
        .send(testTag)
        .expect(201)
        .expect(res => {
          expect(res.body.code).to.equal(testTag.code);
          expect(res.body.name).to.equal(testTag.name);
          testTag._id = res.body._id;
        })
        .end(() => {
          agent
            .post('/blogs')
            .set(helper.adminHeader())
            .send({code: 'test', title: 'test', markdown: '# h1', tags: [testTag._id]})
            .expect(201)
            .end(done);
        });
    });
  });
  describe('Get /tags', () => {
    it('Get created tag only', done => {
      agent
        .get('/tags')
        .expect(200)
        .expect(res => {
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(1);
          //expect(res.body[0].name).to.equal(testTag.name);
          expect(res.body[0].count).to.equal(1);
        })
        .end(done);
    });
  });
  describe('Get /tags/:tagName', () => {
    it('should get tag by name', done => {
      agent
        .get('/tags/' + testTag.code)
        .expect(res => {
          expect(res.body.name).to.equal(testTag.name);
          expect(res.body.blogs.length).to.equal(1);
        })
        .end(done);
    });
  });
  describe('Put /tags/:tagName', () => {
    it('should change tag name', done => {
      agent
        .put('/tags/' + testTag.code)
        .set(helper.adminHeader())
        .send({name: 'modified'})
        .expect(201)
        .expect(res => {
          expect(res.body.name).to.equal('modified');
        })
        .end(done);
    });
  });
  describe('Delete /tags/:tagName', () => {
    it('should delete created tags', done => {
      agent
        .delete('/tags/' + testTag.code)
        .set(helper.adminHeader())
        .expect(204)
        .end(done);
    });
  });
  after(done => {
    cache.del('tags', done);
  })
});