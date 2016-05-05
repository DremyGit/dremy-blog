const expect = require('chai').expect;
const request = require('supertest');
const helper = require('../helper');
const app = require('../../app');

describe('Test controllers/message.js', () => {

  const agent = request.agent(app);

  const testMessage = {
    user: 'test user',
    email: 'test@example.com',
    content: 'test message' + Math.random()
  };

  before((done) => {
    helper.clear('messages', done);
  });

  describe('Post /messages', () => {
    it('Create a message', (done) => {
      agent
        .post('/messages')
        .send(testMessage)
        .expect(201)
        .expect(res => {
          expect(res.body.content).to.equal(testMessage.content);
          testMessage._id = res.body._id;
        })
        .end(done);
    })
  });

  describe('Get /messages', () => {
    it('Get the created message only', (done) => {
      agent
        .get('/messages')
        .expect(200)
        .expect(res => {
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(1);
          expect(res.body[0]._id).to.equal(testMessage._id);
        })
        .end(done);
    })
  });

  describe('Delete /messages/:messageId', () => {
    it('Delete the created message', done => {
      agent
        .delete('/messages/' + testMessage._id)
        .expect(204)
        .end(done);
    })
  })
});