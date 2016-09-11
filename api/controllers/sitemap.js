const models = require('../models');
const Blog =  models.Blog;
const config = require('../config');
const pug = require('pug');
const fs = require('fs');
const path = require('path');

const sitemap = (req, res, next) => {
  Blog.getBlogsByQuery({}).then(blogs => {
    const file = fs.readFileSync(path.resolve(__dirname, '../others/sitemap.pug'), 'utf8');
    res.contentType('text/xml').send(pug.render(file, {
      host: config.host,
      blogs: blogs
    }));
  }).catch(next);
};

module.exports = sitemap;