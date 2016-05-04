'use strict';
const blogController = require('express').Router();
const marked = require('marked');
const HttpError = require('../common/http-error');
const utils = require('../common/utils');
const assertExisted = require('../middlewares/database').assertObjectExisted;
const models = require('../models');
const Blog =  models.Blog;
const Comment = models.Comment;
const Tag = models.Tag;


blogController.route('/')
  /**
   * @api {get} /blogs Get all blogs or get blog by blog_name
   * @apiName GetAllBlogs
   * @apiGroup Blog
   * @apiSuccess {String} [blog_name]
   * @apiSuccess {Object[]} blogs All blogs
   */
  .get((req, res, next) => {
    if (req.query.blog_name) {
      Blog.getBlogByName(req.query.blog_name).then(blog => {
        res.success(blog);
      }).catch(next);
    } else {
      Blog.getAllBlogs().then(blogs => {
        res.success(blogs);
      }).catch(next);
    }
  })

  /**
   * @api {post} /blogs Create new blog
   * @apiName CreateBlog
   * @apiGroup Blog
   * @apiParam {Object} blog Blog object
   * @apiSuccess (201) {Object} blog created blog
   */
  .post((req, res, next) => {
    const body = req.body;
    const _blog = new Blog({
      name: body.name,
      title: body.title,
      tag: body.tag,
      markdown: body.markdown,
      html: marked(body.markdown),
      toc: [],
      comments: []
    });
    let blog_g;
    _blog.save().then(blog => {
      blog_g = blog;
      return Tag.addBlogId(body.tag, blog._id)
    }).then(() => {
      res.success(blog_g, 201);
    }).catch(next);
  });


blogController.route('/:blogId')
  .all(assertExisted('blogId', Blog))

  /**
   * @api {get} /blogs/:blogId Get blog by id
   * @apiName GetBlogById
   * @apiGroup Blog
   * @apiParam {String} blogId Blog objectId
   * @apiSuccess {Object} blog
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
   * @apiParam {String} blogId Blog objectId
   * @apiSuccess (201) {Object} blog Blog after updated
   */
  .put((req, res, next) => {
    const blogId = req.params.blogId;
    const body = req.body;
    Blog.getBlogById(blogId).then(blog => {

      // Old blog tag
      const blogTag = blog.tag && blog.tag.toString();
      const _blog = Object.assign(blog, body);
      if (body.tag && body.tag != blogTag) {
        return Promise.all([
          _blog.save(),
          Tag.removeBlogId(blogTag, _blog.id),
          Tag.addBlogId(body.tag, _blog.id)
        ])
      } else {
        return _blog.save()
      }
    }).then(result => {

      // if update tags
      if (Array.isArray(result)) {
        res.success(result[0], 201)
      } else {
        res.success(result, 201)
      }
    }).catch(next);
  })


  /**
   * @api {delete} /blogs/:blogId Delete blog by id
   * @apiName DeleteBlog
   * @apiGroup Blog
   * @apiParam {String} blogId Blog objectId
   * @apiSuccess 204
   */
  .delete((req, res, next) => {
    const blogId = req.params.blogId;
    Blog.removeById(blogId).then(() => {
      res.success(null, 204);
    }).catch(next);
  });




blogController.route('/:blogId/comments')
  .all(assertExisted('blogId', Blog))

  /**
   * @api {get} /blogs/:blogId/comments Get all comment in a blog
   * @apiName getCommentsByBlogId
   * @apiGroup Comment
   *
   * @apiParam {String} blogId targetBlogId
   * @apiSuccess {Object[]} comments
   */
  .get((req, res, next) => {
    const blogId = req.params.blogId;
    Blog.getBlogById(blogId).then(blog => {
      const promises = blog.comments.map(Comment.getCommentById.bind(Comment));
      return Promise.all(promises)
    }).then(comments => {
      res.success(comments);
    }).catch(next);
  })

  /**
   * @api {post} /blogs/:blogId/comments Create new comment belong to a blog
   * @apiName GetAllComments
   * @apiGroup Comment
   *
   * @apiParam {String} blogId targetBlogId
   * @apiParam {Object} comment Comment
   * @apiSuccess {Object} comment Created comment
   */
  .post((req, res, next) => {
    const body = req.body;
    const blogId = req.params.blogId;
    const _comment = new Comment({
      user: body.user,
      blog: blogId,
      target: body.target,
      email: body.email,
      content: body.content
    });
    let comment_g;
    _comment.save().then(comment => {
      comment_g = comment;
      return Blog.addComment(blogId, comment._id)
    }).then(() => {
      res.success(comment_g, 201);
    }).catch(next);
  });


module.exports = blogController;