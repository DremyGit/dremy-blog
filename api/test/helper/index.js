const helper = {};
const mongoose = require('mongoose');
const models = require('../../models');
const Blog = models.Blog;


helper.clear = (collection, callback) => {
  mongoose.connection.collections[collection].drop( () => {
    console.log('Dropped collection ' + collection);
    callback();
  });
};

helper.createTestBlog = (testBlog) => {
  return new Promise((resolve, reject) => {
    Object.assign(new Blog(), testBlog).save().then(blog => {
      resolve(blog);
    }).catch(reject);
  })
};


helper.findOneInModelById = (model, id) => {
  return models[model].findById(id).exec();
};


module.exports = helper;
