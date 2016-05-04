'use strict';
const expect = require('chai').expect;
const request = require('supertest');
const helper = require('../helper');
const app = require('../../app');

describe('Test controllers/tag.js', () => {
  const agent = request.agent(app);
  const rand = Math.random();
  let testTag = {
    name: 'test-' + rand
  };

  before((done) => {
    helper.clear('tags', done);
  });

  describe('Post /tags', () => {
    it('Create a tag', (done) => {
      agent
        .post('/tags')
        .send(testTag)
        .expect(201)
        .expect(res => {
          expect(res.body.name).to.equal(testTag.name);
          expect(res.body.blogs).to.be.a('Array');
          expect(res.body.blogs.length).to.equal(0);
          testTag._id = res.body._id;
        })
        .end(done);
    })
  });

  describe('Get /tags', () => {
    it('Get all tags', (done) => {
      agent
        .get('/tags')
        .expect(200)
        .expect(res => {
          expect(res.body).to.be.a('Array');
          expect(res.body.length).not.equal(0);
        })
        .end(done);
    });
  });

  describe('Get /tags/:tagId', () => {
    it('Get created tag', (done) => {
      agent
        .get('/tags/' + testTag._id)
        .expect(200)
        .expect(res => {
          expect(res.body.name).to.equal(testTag.name);
        })
        .end(done);
    });

    it('Return 404 using a non-existent tag id', (done) => {
      agent.get('/tags/' + 'a'.repeat(24)).expect(404).end(done);
    });

    it('Return 404 using a bad tag id', (done) => {
      agent.get('/tags/test').end(done);
    })
  });

  describe('Put /tags/:tagId', () => {
    it('Update created tag', (done) => {
      agent
        .put('/tags/' + testTag._id)
        .send({name: 'Modified'})
        .expect(201)
        .expect(res => {
          expect(res.body.name).to.equal('Modified');
          expect(res.body.blogs).to.be.an('array');
          expect(res.body.blogs.length).to.equal(0);
        })
        .end(done);
    });
  });

  describe('Get /tags/:tagId/blogs', () => {
    before((done) => {
      const testBlog = {
        name: 'testBlog-' + rand,
        title: 'test-blog-' + rand,
        markdown: '# test',
        tag: testTag._id
      };
      agent
        .post('/blogs')
        .send(testBlog)
        .end(done);
    });
    it('Get blogs by tagId', (done) => {
      agent
        .get('/tags/' + testTag._id + '/blogs')
        .expect(200)
        .expect(res => {
          expect(res.body).to.be.an('array');
          expect(res.body.length).not.equal(0);
        })
        .end(done);
    })
  });

  describe('Delete /tags/:tagId', () => {
    it('Delete created tag', (done) => {
      agent.delete('/tags/' + testTag._id).expect(204).end(done);
    });

    it('Return a 404', (done) => {
      agent.delete('/tags/' + testTag._id).expect(404).end(done);
    })
  })

});