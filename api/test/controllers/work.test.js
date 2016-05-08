const expect = require('chai').expect;
const request = require('supertest');
const helper = require('../helper');
const app = require('../../app');

describe('Test controllers/work.js', () => {

  const agent = request.agent(app);
  const testWork = {
    code: 'test work' + Math.random(),
    introduction: 'test work',
    url: 'http://example.com/',
    picUrl: 'http://example.com/example.jpg'
  };
  before(done => {
    helper.clear('works', done);
  });

  describe('Post /works', () => {
    it('Create a new work', done => {
      agent
        .post('/works')
        .set(helper.adminHeader())
        .send(testWork)
        .expect(201)
        .expect(res => {
          expect(res.body.code).to.equal(testWork.code);
          testWork._id = res.body._id;
        })
        .end(done);
    });
  });

  describe('Get /works', () => {
    it('Get created work only', done => {
      agent
        .get('/works')
        .expect(200)
        .expect(res => {
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(1);
          expect(res.body[0]._id).to.equal(testWork._id);
        })
        .end(done);
    });
  });

  describe('Put /works/:workId', () => {
    it('Update created work', done => {
      const codePatch = {code: 'modified-' + Math.random()};
      agent
        .put('/works/' + testWork._id)
        .set(helper.adminHeader())
        .send(codePatch)
        .expect(201)
        .expect(res => {
          expect(res.body.code).to.equal(codePatch.code);
        })
        .end(done);
    });
  });

  describe('Delete /works/:workId', () => {
    it('Delete created work', done => {
      agent
        .delete('/works/' + testWork._id)
        .set(helper.adminHeader())
        .expect(204)
        .end(done);
    });
  });
});
