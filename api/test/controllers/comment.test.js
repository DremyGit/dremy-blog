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
        .post('/blogs/' + testBlog._id + '/comments')
        .send(comment)
        .expect(201)
        .expect(res => {
          const result = res.body;
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
          expect(res.body.length).not.equal(0);
        })
        .end(done);
    });
  });

  describe('Get /blogs/:blogId/comments', () => {
    it('Get comments in a blog', (done) => {
      agent
        .get('/blogs/' + testBlog._id + '/comments')
        .expect(200)
        .expect(res=> {
          expect(res.body.length).not.equal(0);
        })
        .end(done);
    });

    it('Get a 404 using a none-existent blog id', (done) => {
      agent.get('/blogs/' + 'a'.repeat(24) + '/comments').expect(404).end(done)
    });

    it('Get a 404 using a wrong blog id', (done) => {
      agent.get('/blogs/test/comments').expect(404).end(done)
    });
  });

  describe('Get /comments/:commentId', () => {
    it('Get comment by id', (done) => {
      agent
        .get('/comments/' + comment._id)
        .expect(200)
        .expect(res=> {
          const result = res.body;
          expect(result.user).equal(comment.user);
          expect(result.email).equal(comment.email);
          expect(result.content).equal(comment.content);
        })
        .end(done);
    });

    it('Get a 404 using a none-existent comment id', (done) => {
      agent.get('/comments/' + 'a'.repeat(24)).expect(404).end(done)
    });

    it('Get a 404 using a wrong comment id', (done) => {
      agent.get('/comments/test').expect(404).end(done)
    });
  });

  describe('Delete /comments/:commentId', () => {
    it('Delete comment', (done) => {
      agent
        .delete('/comments/' + comment._id)
        .expect(204)
        .end(done);
    });
  });
});