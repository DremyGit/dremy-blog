const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');
const helper = require('../helper');
const cache = require('../../common/cache');

describe('Test controllers/category', () => {
  const agent = request.agent(app);
  const testCategory = {
    code: 'test',
    name: 'test-cate'
  };
  before(done => {
    helper.clear('categories', () => {
      helper.clear('blogs', () => {
        cache.del('categories', done);
      });
    });
  });
  describe('POST /categories', () => {
    it('Create a category', done => {
      agent
        .post('/categories')
        .set(helper.adminHeader())
        .send(testCategory)
        .expect(201)
        .expect(res => {
          expect(res.body.code).to.equal(testCategory.code);
          expect(res.body.name).to.equal(testCategory.name);
          testCategory._id = res.body._id;
        })
        .end(() => {
          agent
            .post('/blogs')
            .set(helper.adminHeader())
            .send({code: 'test', title: 'test', markdown: '# h1', category: testCategory._id})
            .expect(201)
            .end(done);
        });
    });
  });
  describe('Get /categories', () => {
    it('Get created category only', done => {
      agent
        .get('/categories')
        .expect(res => {
          expect(res.body.message).to.be.undefined;
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(1);
          expect(res.body[0].name).to.equal(testCategory.name);
          expect(res.body[0].count).to.equal(1);
        })
        .expect(200)
        .end(done);
    });
  });
  describe('Get /categories/:categoryName', () => {
    it('should get category by name', done => {
      agent
        .get('/categories/' + testCategory.code)
        .expect(res => {
          expect(res.body.name).to.equal(testCategory.name);
          expect(res.body.blogs.length).to.equal(1);
        })
        .end(done);
    });
  });
  describe('Put /categories/:categoryName', () => {
    it('should change category name', done => {
      agent
        .put('/categories/' + testCategory.code)
        .set(helper.adminHeader())
        .send({name: 'modified'})
        .expect(201)
        .expect(res => {
          expect(res.body.name).to.equal('modified');
        })
        .end(done);
    });
  });
  describe('Delete /categories/:categoryName', () => {
    it('should delete created categories', done => {
      agent
        .delete('/categories/' + testCategory.code)
        .set(helper.adminHeader())
        .expect(204)
        .end(done);
    });
    it('the blog should be remove the category', done => {
      agent
        .get('/blogs/test')
        .expect(200)
        .expect(res => {
          expect(res.body.category).to.be.undefined;
        })
        .end(done);
    })
  });
  after(done => {
    cache.del('categories', done);
  })
});