'use strict';
const blogController = require('express').Router();
const models = require('../models');
const Blog = models.Blog;
const marked = require('marked');
const HttpError = require('../common/http-error');


blogController.route('/')
  /**
   * @api {get} /blogs Get all blogs
   * @apiName GetAllBlogs
   * @apiGroup Blog
   * @apiSuccess {Object} msg
   */
  .get((req, res, next) => {
    Blog.getAllBlogs().then(blogs => {
      res.success(blogs);
    }).catch(next);
  })

  /**
   * @api {post} /blogs Create new blog
   * @apiName CreateBlog
   * @apiGroup Blog
   *
   */
  .post((req, res, next) => {
    const body = req.body;
    const _blog = new Blog({
      name: body.name,
      title: body.title,
      tag: null,
      markdown: body.markdown,
      html: marked(body.markdown),
      toc: [],
      comments: []
    });
    _blog.save().then(blog => {
      res.success(blog, 201);
    }).catch(next);
  });


blogController.route('/:blogId')
  /**
   * @api {delete} /blogs/:blogId Delete blog by id
   * @apiName DeleteBlog
   * @apiGroup Blog
   *
   * @apiSuccess (204)
   */
  .delete((req, res, next) => {
    const blogId = req.params.blogId;
    Blog.getBlogById(blogId).then((blog) => {
      if (!blog) {
        throw new HttpError.NotFoundError('No such blog');
      }
      return Blog.removeById(blogId)
    }).then(() => {
      res.success(null, 204);
    }).catch(next);
  });



//blogController.route('/tags')
//  /**
//   * @api {get} /blogs/tags/:tagId Get blogs by tag id
//   * @apiName GetBlogsByTagId
//   * @apiGroup Blog
//   *
//   * @apiParam {String} tagId
//   */
//  .get((req, res, next) => {
//    //res.end(JSON.stringify({msg: "Hello tags"}))
//    return next(new Error("haha"));
//  });

module.exports = blogController;