const helper = {};
const mongoose = require('mongoose');
const Blog = require('../../models').Blog;


helper.clear = (collection, callback) => {
  mongoose.connection.collections[collection].drop( () => {
    console.log('Dropped collection ' + collection);
    callback();
  });
};

helper.createTestBlog = (callback) => {
  const rand = Math.random();
  const testBlog = new Blog({
    name: 'testBlog-' + rand,
    title: 'test-blog-' + rand
  });
  testBlog.save().then(blog => {
    callback(blog);
  })
};

module.exports = helper;
