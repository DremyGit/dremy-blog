const expect = require('chai').expect;
const request = require('supertest');
const helper = require('../helper');
const app = require('../../app');

describe('Test controllers/authorization.js', () => {

  const agent = request.agent(app);
  var token;
  before((done) => {
    helper.createTestAdmin('test', '123').then(() => done());
  });

  it('Get a token using right account', done => {
    agent
      .post('/authorization')
      .send({username: 'test', password: '123'})
      .expect(200)
      .expect(res => {
        token = res.body.token;
        expect(token).to.match(/[^.]+\.[^.]+\.[^.]+/);
      })
      .end(done);
  });
  it('Get a 401 using a wrong account', done => {
    agent
      .post('/authorization')
      .send({username: 'test', password: 'test'})
      .expect(401)
      .end(done);
  });
  after(done => {
    helper.clear('admins', done);
  })
});