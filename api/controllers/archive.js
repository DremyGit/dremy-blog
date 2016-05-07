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
      const query = [{}, {create_at: 1}];
      Blog.getBlogsByQuery(query).then(blogs => {
        let archives = {};
        for (let i = 0; i < blogs.length; i++) {
          let date = new Date(blogs[i].create_at);
          let year = '' + date.getFullYear();
          let month = '' + (date.getMonth() + 1);
          if (!archives[year]) {
            archives[year] = {};
          }
          if (!archives[year][month]) {
            archives[year][month] = 1;
          } else {
            archives[year][month]++;
          }
        }
        res.success(archives);
        return cache.set('archives', archives, 600)
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
      const query = [{
        create_at: {
          $gte: new Date(year, month - 1),
          $lt: new Date(year, month)
        }
      },
        {markdown: 0, html: 0, toc: 0}
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