'use strict';
const app = require('../../app');
const expect = require('chai').expect;
const request = require('supertest');
const helper = require('../helper');

describe('Test controllers/comment.js', () => {

  const agent = request.agent(app);
  const rand = Math.random();
  let testBlog = {
    code: 'testBlog-' + rand,
    title: 'test-blog-' + rand
  };
  let testComment = {
    user: 'test user',
    email: 'example@example.com',
    content: 'Comment test'
  };
  let testReply = {
    user: 'user 2',
    email: 'example@example.com',
    content: 'Comment reply'
  };

  before((done) => {
    helper.clear('comments', () => {
      agent
        .post('/blogs')
        .set(helper.adminHeader())
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
        .send(testComment)
        .expect(201)
        .expect(res => {
          const result = res.body;
          expect(result.user).equal(testComment.user);
          expect(result.email).equal(testComment.email);
          expect(result.content).equal(testComment.content);
          expect(result.blog).equal(testBlog._id);
          testComment._id = result._id;
          testReply.reply_id = result._id;
        })
        .end(done);
    });
    it('Create comment reply', done => {
      agent
        .post(`/blogs/${testBlog._id}/comments`)
        .send(testReply)
        .expect(201)
        .expect(res => {
          expect(res.body.reply_to._id).to.equal(testComment._id);
          testReply._id = res.body._id;
        })
        .end(done);
    });
    it('comment count should be 2', (done) => {
      agent
        .get('/blogs/' + testBlog._id)
        .expect(res => {
          expect(res.body.comment_count).to.equal(2);
        })
        .end(done);
    });
  });

  describe('Get /comments', () => {
    it('Get all comments', (done) => {
      agent
        .get('/comments')
        .set(helper.adminHeader())
        .expect(200)
        .expect(res => {
          expect(res.body.length).not.equal(0);
        })
        .end(done);
    });
  });

  describe('Get /blogs/:blogName/comments', () => {
    it('Get comments in a blog', (done) => {
      agent
        .get('/blogs/' + testBlog.code + '/comments')
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
        .get('/comments/' + testComment._id)
        .expect(200)
        .expect(res=> {
          const result = res.body;
          expect(result.user).equal(testComment.user);
          expect(result.email).equal(testComment.email);
          expect(result.content).equal(testComment.content);
        })
        .end(done);
    });
  });

  describe('Delete /comments/:commentId', () => {
    it('Delete reply comment', (done) => {
      agent
        .delete('/comments/' + testReply._id)
        .set(helper.adminHeader())
        .expect(204)
        .end(done);
    });
    it('comment count should be 1', (done) => {
      agent
        .get('/blogs/' + testBlog._id)
        .expect(res => {
          expect(res.body.comment_count).to.equal(1);
        })
        .end(done);
    });
    it('reply comment should be remove', done => {
      agent
        .get(`/blogs/${testBlog._id}/comments`)
        .expect(res => {
          expect(res.body[0].replies.length).to.equal(0);
        })
        .end(done);
    });
  });
});