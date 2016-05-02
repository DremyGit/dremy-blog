'use strict';
const request = require('supertest');
const server = require('../../app.js');
const expect = require('chai').expect;

const rand = Math.random();
let id;
describe('Test controllers/blog', () => {

  it('POST /blogs Create a blog:', (done) => {
    const blog = {
      name: 'test-' + rand,
      title: 'test-' + rand,
      markdown: '# test'
    };
    request(server)
      .post('/blogs')
      .send(blog)
      .expect(res => {
        const result = res.body.result;
        expect(result._id.length).to.equal(24);
        expect(result.name).to.equal('test-' + rand);
        id = result._id;
      })
      .expect(201, done)
  });

  it('Get /blogs 200', (done) => {
    request(server)
      .get('/blogs')
      .expect(res => {
        expect(res.body.result.length).not.equal(0);
      })
      .expect(200, done)
  });

  it('Delete /blogs/:id Delete blog', (done) => {
    request(server)
      .delete('/blogs/' + id)
      .expect(204, done);
  })
});