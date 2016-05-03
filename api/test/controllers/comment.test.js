'use strict';
const app = require('../../app');
const expect = require('chai').expect;
const request = require('supertest');
const helper = require('../helper');

describe('Test controllers/comment.js', () => {

  const agent = request.agent(app);
  let testBlog = {};
  let comment = {
    user: 'test user',
    email: 'example@example.com',
    content: 'Comment test'
  };

  before((done) => {
    helper.clear('comments', () => {
      helper.createTestBlog(blog => {
        testBlog = blog;
        done();
      })
    });
  });

  describe('Post /comments', () => {
    it('Create new comment', (done) => {
      agent
        .post('/comments?blogId=' + testBlog._id)
        .send(comment)
        .expect(201)
        .expect(res => {
          const result = res.body.result;
          expect(result.user).equal(comment.user);
          expect(result.email).equal(comment.email);
          expect(result.content).equal(comment.content);
          comment._id = result._id;
        })
        .end(done);
    })
  });

  describe('Get /comments', () => {
    it('Get all comments', (done) => {
      agent
        .get('/comments')
        .expect(200)
        .expect(res => {
          expect(res.body.result.length).not.equal(0);
        })
        .end(done);
    });
  });

  describe('Delete /comments/:commentId', () => {
    it('Delete comment', (done) => {
      agent
        .delete('/comments/' + comment._id)
        .expect(204)
        .end(done);
    })
  })
});