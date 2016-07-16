'use strict';
const blogController = require('express').Router();
const toc = require('../common/toc');
const HttpError = require('some-http-error');
const utils = require('../common/utils');
const assertAndSetId = require('../middlewares/database').assertAndSetId;
const adminRequired = require('../middlewares/auth').adminRequired;
const models = require('../models');
const Blog =  models.Blog;
const Comment = models.Comment;
const marked = require('../common/markdown');
const Tag = models.Tag;


blogController.route('/')
  /**
   * @api {get} /blogs Get all blogs
   * @apiName GetAllBlogs
   * @apiGroup Blog
   * @apiSuccess {Object[]} blogs All blogs
   */
  .get((req, res, next) => {
    Blog.getBlogsByQuery({}).then(blogs => {
      res.success(blogs);
    }).catch(next);
  })

  /**
   * @api {post} /blogs Create new blog
   * @apiPermission admin
   * @apiName CreateBlog
   * @apiGroup Blog
   * @apiParam {Object} blog Blog object
   * @apiSuccess (201) {Object} blog created blog
   */
  .post(adminRequired, (req, res, next) => {
    const body = req.body;
    let _blog = Object.assign(new Blog(), body);
    Blog.createBlog(_blog).then(blog => {
      res.success(blog, 201);
    }).catch(next);
  });

blogController.post('/markdown', adminRequired, (req, res, next) => {
  const markdown = req.body.markdown || '';
  const html = marked(markdown);
  res.success({html: html});
});

blogController.route('/:blogName')
  .all(assertAndSetId('blogName', Blog))

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
   * @apiPermission admin
   * @apiName UpdateBlog
   * @apiGroup Blog
   * @apiParam {String} blogId Blog objectId
   * @apiSuccess (201) {Object} blog Blog after updated
   */
  .put(adminRequired, (req, res, next) => {
    const blogId = req.params.blogId;
    const body = req.body;
    Blog.getBlogById(blogId, true).then(blog => {
      Object.assign(blog, body);
      return Blog.updateBlog(blog);
    }).then(blog => {
      res.success(blog, 201);
    }).catch(next);
    //Blog.getBlogById(blogId).then(blog => {
    //
    //  // Old blog tag
    //  const blogTag = blog.tag && blog.tag.toString();
    //  const _blog = Object.assign(blog, body);
    //  if (body.tag && body.tag != blogTag) {
    //    return Promise.all([
    //      _blog.save(),
    //      Tag.removeBlogId(blogTag, _blog.id),
    //      Tag.addBlogId(body.tag, _blog.id)
    //    ])
    //  } else {
    //    return _blog.save()
    //  }
    //}).then(result => {
    //
    //  // if update tags
    //  if (Array.isArray(result)) {
    //    res.success(result[0], 201)
    //  } else {
    //    res.success(result, 201)
    //  }
    //}).catch(next);
  })


  /**
   * @api {delete} /blogs/:blogId Delete blog by id
   * @apiPermission admin
   * @apiName DeleteBlog
   * @apiGroup Blog
   * @apiParam {String} blogId Blog objectId
   * @apiSuccess 204
   */
  .delete(adminRequired, (req, res, next) => {
    const blogId = req.params.blogId;
    Blog.removeById(blogId).then(() => {
      res.success(null, 204);
    }).catch(next);
  });




blogController.route('/:blogName/comments')
  .all(assertAndSetId('blogName', Blog))

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
    Comment.getCommentNestedByBlogId(blogId).then(comments => {
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
    const replyId = req.body.reply_id;
    let rootId;
    utils.verifyUserForm(body);
    const _comment = Object.assign(new Comment(), body);
    _comment.blog = blogId;
    if (replyId) {
      Comment.getCommentById(replyId).then(replyTo => {
        _comment.reply_to = replyTo.toObject();
        _comment.root_id = rootId = replyTo.root_id || replyId;
        return Comment.createComment(_comment)
      }).then(comment => {
        res.success(comment, 201);
        Blog.increaseBlogCommentCount(blogId, 1);
        Comment.updateRootComment(rootId, comment._id);
      }).catch(next);
    } else {
      Comment.createComment(_comment).then(comment => {
        res.success(comment, 201);
        Blog.increaseBlogCommentCount(blogId, 1);
      }).catch(next);
    }
  });


module.exports = blogController;