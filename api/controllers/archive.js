'use strict';
const cache = require('../common/cache');
const Blog = require('../models').Blog;
const HttpError=require('some-http-error');

const archiveController = {};

archiveController.getArchives = (req, res, next) => {
  /**
   * @api {get} /archives Get archives
   * @apiName GetArchives
   * @apiGroup Archive
   *
   * @apiSuccess {Object} archives
   */
    Blog.getBlogArchives().then(archives => {
      res.success(archives);
    }).catch(next);
};


/**
 * @api {get} /archives/:year/:month/blogs Get blogs by archive
 * @apiName GetBlogsByArchive
 * @apiGroup Archive
 *
 * @apiParam {Number} year
 * @apiParam {Number} month
 * @apiSuccess {Object[]} blogs
 */
archiveController.getBlogsByArchive = (req, res, next) => {
  const year = req.params.year;
  const month = req.params.month;
  cache.get('archives:'+year+':'+month, (err, archive) => {
    if (archive) {
      res.success(archive)
    } else {
      const query = { create_at: { $gte: new Date(year, month - 1), $lt: new Date(year, month) }};
      const opt = { markdown: 0, html: 0, toc: 0 };
      Blog.getBlogsByQuery(query, opt).then(blogs => {
        if (blogs.length == 0) {
          throw new HttpError.NotFoundError();
        }
        res.success(blogs);
        return cache.set('archives:' + year + ':' + month, blogs, 600)
      }).catch(next);
    }
  });
};

module.exports = archiveController;