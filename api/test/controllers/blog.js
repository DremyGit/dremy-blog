const request = require('supertest');
const server = require('../../app.js');
const expect = require('chai').expect;

const rand = Math.random();
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
        console.log(result);
        expect(result.name).to.equal('test-' + rand);
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
      .delete('/blogs/test-' + rand)
      .expect(204, done);
  })
});