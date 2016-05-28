const expect = require('chai').expect;
const request = require('supertest');
const helper = require('../helper');
const app = require('../../app');
const cache = require('../../common/cache');

describe('Test controllers/message.js', () => {

  const agent = request.agent(app);

  const testMessage = {
    user: 'test user',
    email: 'test@example.com',
    content: 'test message' + Math.random()
  };

  const testMessage2 = {
    user: 'test',
    email: '123456',
    content: 'test'
  };

  const testReply = {
    user: 'test',
    email: '123@example.com',
    content: 'test reply'
  };

  before((done) => {
    helper.clear('comments', () => {
      cache.delMulti('messages:*').then(done);
    });
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
          testReply.reply_id = res.body._id;
        })
        .end(done);
    });
    it('Can\'t create a message with a wrong email', (done) => {
      agent
        .post('/messages')
        .send(testMessage2)
        .expect(400)
        .expect(res => {
          expect(res.body.message).to.include('Email');
        })
        .end(done);
    });
    it('Create a reply message', done => {
      agent
        .post('/messages')
        .send(testReply)
        .expect(201)
        .end(done);
    })
  });


  describe('Get /messages', () => {
    it('Get the created messages in tree', (done) => {
      agent
        .get('/messages')
        .expect(200)
        .expect(res => {
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(1);
          expect(res.body[0]._id).to.equal(testMessage._id);
          expect(res.body[0].replies.length).to.equal(1);
        })
        .end(done);
    })
    it('Get the created messages in list', (done) => {
      agent
        .get('/messages?list=1')
        .expect(200)
        .expect(res => {
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(2);
        })
        .end(done);
    })
  });

  describe('Delete /messages/:messageId', () => {
    it('Delete the created message', done => {
      agent
        .delete('/messages/' + testMessage._id)
        .set(helper.adminHeader())
        .expect(204)
        .end(done);
    })
  })
});