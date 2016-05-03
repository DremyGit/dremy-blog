'use strict';
const request = require('supertest');
const server = require('../../app.js');
const expect = require('chai').expect;
const helper = require('../helper');

const rand = Math.random();
let id;
describe('Test controllers/blog', () => {
  const agent = request.agent(server);
  let testBlog = {
    name: 'test-' + rand,
    title: 'test-' + rand,
    markdown: '# test'
  };
  before((done) => {
    helper.clear('blogs', done);
  });

  describe('POST /blogs', () => {
    it('Create a blog', (done) => {
      agent
        .post('/blogs')
        .send(testBlog)
        .expect(201)
        .expect(res => {
          const result = res.body;
          expect(result._id.length).to.equal(24);
          expect(result.name).to.equal('test-' + rand);
          id = result._id;
        })
        .end(done);
    });
  });

  describe('Get /blogs', () => {
    it('Get all blogs', (done) => {
      agent
        .get('/blogs')
        .expect(200)
        .expect(res => {
          expect(res.body.length).not.equal(0);
        })
        .end(done)
    });

    it('Get blog by blog name', (done) => {
      agent
        .get('/blogs?blog_name=' + testBlog.name)
        .expect(200)
        .expect(res => {
          expect(res.body.title).to.equal(testBlog.title)
        })
        .end(done);
    });
  });

  describe('Get /blogs/:id', () => {
    it('Get created blog', (done) => {
      agent
        .get('/blogs/' + id)
        .expect(200)
        .expect(res => {
          expect(res.body.name).to.equal('test-' + rand);
        })
        .end(done);
    });

    it('Get a 404 using a non-existent blog id', (done) => {
      agent.get('/blogs/' + 'a'.repeat(24)).expect(404).end(done)
    });

    it('Get a 404 using a wrong blog id', (done) => {
      agent.get('/blogs/test').expect(404).end(done)
    });
  });

  describe('Put /blogs/:id', () => {
    it('Modify created blog', (done) => {
      const blog = {
        name: 'modify-' + rand,
        title: 'modify-' + rand,
        markdown: '# modify'
      };
      agent
        .put('/blogs/' + id)
        .send(blog)
        .expect(201)
        .expect(res => {
          expect(res.body.name).to.equal('modify-' + rand);
        })
        .end(done);
    })
  });

  describe('Delete /blogs/:id', () => {
    it('Delete created blog', (done) => {
      agent
        .delete('/blogs/' + id)
        .expect(204, done);
    })
  });
});
