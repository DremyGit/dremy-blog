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

  let testTag2 = {
    name:'test-2-' + rand
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

    it('Create tag2', (done) => {
      agent
        .post('/tags')
        .send(testTag)
        .expect(201)
        .expect(res => {
          expect(res.body._id).to.not.equal(testTag._id);
          testTag2._id = res.body._id;
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
          expect(res.body.length).to.not.equal(0);
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

  describe('Test blog tag change', () => {
    const testBlog = {
      name: 'testBlog-' + rand,
      title: 'test-blog-' + rand,
      markdown: '# test'
    };
    it('Create a test blog', (done) => {
      testBlog.tag = testTag._id;
      agent
        .post('/blogs')
        .send(testBlog)
        .expect(201)
        .expect(res => {
          expect(res.body.tag).to.equal(testTag._id);
          testBlog._id = res.body._id;
        })
        .end(done);
    });

    it('Change blog tag to tag2', (done) => {
      agent
        .put('/blogs/' + testBlog._id)
        .send({tag: testTag2._id})
        .expect(201)
        .expect(res => {
          expect(res.body.tag).to.equal(testTag2._id);
          expect(res.body.name).to.equal(testBlog.name);
        })
        .end(done);
    });

    it('List of tag blog should be update', (done) => {
      helper.findOneInModelById('Tag', testTag._id).then(tag => {
        expect(tag.blogs).to.not.contain(testBlog._id);
        return helper.findOneInModelById('Tag', testTag2._id)
      }).then(tag2 => {
        expect(tag2.blogs).to.contain(testBlog._id);
        done();
      }).catch(e => console.log(e.stack));
    });

    it('change blog tag to tag', (done) => {
      agent
        .put('/blogs/' + testBlog._id)
        .send({tag: testTag._id})
        .expect(res => {
          expect(res.body.tag).to.equal(testTag._id);
        })
        .end(done);
    })
  });

  describe('Get /tags/:tagId/blogs', () => {
    it('Get blogs by tagId', (done) => {
      agent
        .get('/tags/' + testTag._id + '/blogs')
        .expect(200)
        .expect(res => {
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.not.equal(0);
        })
        .end(done);
    });
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