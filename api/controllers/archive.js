'use strict';
const archiveController = require('express').Router();
const cache = require('../common/cache');
const Blog = require('../models').Blog;
const HttpError=require('../common/http-error');

archiveController.get('/', (req, res, next) => {
  /**
   * @api {get} /archives Get archives
   * @apiName GetArchives
   * @apiGroup Archive
   *
   * @apiSuccess {Object} archives
   */
  cache.get('archives', (err, archives) => {
    if (archives) {
      res.success(archives)
    } else {
      Blog.getBlogArchives().then(archives => {
        res.success(archives);
        cache.set('archives', archives);
      }).catch(next);
    }
  })
});


/**
 * @api {get} /archives/:year/:month/blogs Get blogs by archive
 * @apiName GetBlogsByArchive
 * @apiGroup Archive
 *
 * @apiParam {Number} year
 * @apiParam {Number} month
 * @apiSuccess {Object[]} blogs
 */
archiveController.get('/:year/:month/blogs', (req, res, next) => {
  const year = req.params.year;
  const month = req.params.month;
  cache.get('archives:'+year+':'+month, (err, archive) => {
    if (archive) {
      res.success(archive)
    } else {
      const query = [
        { create_at: { $gte: new Date(year, month - 1), $lt: new Date(year, month) }},
        { markdown: 0, html: 0, toc: 0 }
      ];
      Blog.getBlogsByQuery(query).then(blogs => {
        if (blogs.length == 0) {
          throw new HttpError.NotFoundError();
        }
        res.success(blogs);
        return cache.set('archives:' + year + ':' + month, blogs, 600)
      }).catch(next);
    }
  });
});

module.exports = archiveController;