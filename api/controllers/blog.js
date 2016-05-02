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

  .all((req, res, next) => {
    const blogId = req.params.blogId;
    if (blogId.match(/^[0-9a-fA-F]{24}$/)) {
      Blog.getBlogById(blogId).then(blog => {
        if (!blog) {
          throw new HttpError.NotFoundError('Blog not found');
        }
        next();
      }).catch(res.error);
    } else {
      throw new HttpError.NotFoundError('Blog not found');
    }
  })

  /**
   * @api {get} /blogs/:blogId Get blog by id
   * @apiName GetBlogById
   * @apiGroup Blog
   *
   * @apiSuccess (200) {Blog}
   */
  .get((req, res, next) => {
    const blogId = req.params.blogId;
    Blog.getBlogById(blogId).then(blog => {
      res.success(blog)
    }).catch(next);
  })

  /**
   * @api {put} /blogs/:blogId Update blog by id
   * @apiName UpdateBlog
   * @apiGroup Blog
   *
   * @apiSuccess (201) {Blog}
   */
  .put((req, res, next) => {
    const blogId = req.params.blogId;
    const body = req.body;
    Blog.getBlogById(blogId).then(blog => {
      const _blog = Object.assign(blog, body);
      _blog.save().then(newBlog => {
        res.success(newBlog, 201)
      }).catch(next);
    }).catch(next);
  })


  /**
   * @api {delete} /blogs/:blogId Delete blog by id
   * @apiName DeleteBlog
   * @apiGroup Blog
   *
   * @apiSuccess (204)
   */
  .delete((req, res, next) => {
    const blogId = req.params.blogId;
    Blog.removeById(blogId).then(() => {
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