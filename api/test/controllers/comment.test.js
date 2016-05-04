'use strict';
const app = require('../../app');
const expect = require('chai').expect;
const request = require('supertest');
const helper = require('../helper');

describe('Test controllers/comment.js', () => {

  const agent = request.agent(app);
  const rand = Math.random();
  let testBlog = {
    name: 'testBlog-' + rand,
    title: 'test-blog-' + rand,
    markdown: '# test'
  };
  let comment = {
    user: 'test user',
    email: 'example@example.com',
    content: 'Comment test'
  };

  before((done) => {
    helper.clear('comments', () => {
      agent
        .post('/blogs')
        .send(testBlog)
        .expect(res => {
          testBlog._id = res.body._id;
        })
        .end(done);
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