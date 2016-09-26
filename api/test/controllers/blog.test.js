'use strict';
const request = require('supertest');
const server = require('../../app.js');
const expect = require('chai').expect;
const helper = require('../helper');
const cache = require('../../common/cache');

const rand = Math.random();
let id;
describe('Test controllers/blog', () => {
  const agent = request.agent(server);
  let testBlog = {
    code: 'test-' + rand,
    title: 'test-' + rand,
    cover: 'http://example.com/test.png',
    markdown: {
      summary: '# test',
      body: ""
    },
    other: 'other'
  };
  before((done) => {
    helper.clear('blogs', () => {
      cache.delMulti('blogs:*').then(() => done())
    });
  });

  describe('POST /blogs', () => {
    it('Create a blog', (done) => {
      agent
        .post('/blogs')
        .set(helper.adminHeader())
        .send(testBlog)
        .expect(201)
        .expect(res => {
          const result = res.body;
          expect(result._id.length).to.equal(24);
          expect(result.code).to.equal('test-' + rand);
          expect(result.other).to.be.undefined;
          id = result._id;
        })
        .end(done);
    });
  });

  describe('PUT /blogs', () => {
    it('Update all blogs', done => {
      agent
        .put('/blogs')
        .set(helper.adminHeader())
        .expect(201)
        .expect(res => {
          expect(res.body.count).to.equal(1);
        })
        .end(done)
    })
  })

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

  });

  describe('Get /blogs/:blogId', () => {
    it('Get created blog by id', (done) => {
      agent
        .get('/blogs/' + id)
        .expect(200)
        .expect(res => {
          expect(res.body.code).to.equal('test-' + rand);
          expect(res.body.cover).to.equal(testBlog.cover)
        })
        .end(done);
    });

    it('Get created blog by name', (done) => {
      agent
        .get('/blogs/' + testBlog.code)
        .expect(200)
        .expect(res => {
          expect(res.body.title).to.equal(testBlog.title)
        })
        .end(done);
    });

    it('Get a 404 using a non-existent blog id', (done) => {
      agent.get('/blogs/' + 'a'.repeat(24)).expect(404).end(done)
    });

    it('Get a 404 using a non-existent blog name', (done) => {
      agent.get('/blogs/test').expect(404).end(done)
    });
  });

  describe('Put /blogs/:id', () => {
    it('Modify created blog', (done) => {
      const blog = {
        code: 'modify-' + rand,
        title: 'modify-' + rand,
        markdown: {
          summary: '# modify',
          body: '# modify'
        }
      };
      agent
        .put('/blogs/' + id)
        .set(helper.adminHeader())
        .send(blog)
        .expect(201)
        .expect(res => {
          expect(res.body.code).to.equal('modify-' + rand);
        })
        .end(done);
    })
  });

  describe('Delete /blogs/:id', () => {
    it('Delete created blog', (done) => {
      agent
        .delete('/blogs/' + id)
        .set(helper.adminHeader())
        .expect(204, done);
    })
  });
});
