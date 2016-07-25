'use strict';
const toc = require('../common/toc');
const utils = require('../common/utils');
const models = require('../models');
const Blog =  models.Blog;
const Comment = models.Comment;
const marked = require('../common/markdown');


const blogController = {};

/**
 * @api {get} /blogs Get all blogs
 * @apiName GetAllBlogs
 * @apiGroup Blog
 * @apiSuccess {Object[]} blogs All blogs
 */
blogController.getAllBlogs = (req, res, next) => {
  Blog.getBlogsByQuery({}).then(blogs => {
    res.success(blogs);
  }).catch(next);
};

/**
 * @api {post} /blogs Create new blog
 * @apiPermission admin
 * @apiName CreateBlog
 * @apiGroup Blog
 * @apiParam {Object} blog Blog object
 * @apiSuccess (201) {Object} blog created blog
 */
blogController.createBlog = (req, res, next) => {
  const body = req.body;
  let _blog = Object.assign(new Blog(), body);
  Blog.createBlog(_blog).then(blog => {
    res.success(blog, 201);
  }).catch(next);
};

blogController.markdown = (req, res, next) => {
  const markdown = req.body.markdown || '';
  const html = marked(markdown);
  res.success({html: html});
};


/**
 * @api {get} /blogs/:blogId Get blog by id
 * @apiName GetBlogById
 * @apiGroup Blog
 * @apiParam {String} blogId Blog objectId
 * @apiSuccess {Object} blog
 */
blogController.getBlogById = (req, res, next) => {
  const blogId = req.params.blogId;
  Promise.resolve(req.auth.isAuth).then(isAuth => {
    return isAuth
            ? Blog.getBlogByIdAdmin(blogId)
            : Blog.getBlogById(blogId);
  }).then(blog => {
    res.success(blog);
  }).catch(next);
};

/**
 * @api {put} /blogs/:blogId Update blog by id
 * @apiPermission admin
 * @apiName UpdateBlog
 * @apiGroup Blog
 * @apiParam {String} blogId Blog objectId
 * @apiSuccess (201) {Object} blog Blog after updated
 */
blogController.updateBlog = (req, res, next) => {
  const blogId = req.params.blogId;
  const body = req.body;
  Blog.getBlogById(blogId, true).then(blog => {
    Object.assign(blog, body);
    return Blog.updateBlog(blog);
  }).then(blog => {
    res.success(blog, 201);
  }).catch(next);
};


/**
 * @api {delete} /blogs/:blogId Delete blog by id
 * @apiPermission admin
 * @apiName DeleteBlog
 * @apiGroup Blog
 * @apiParam {String} blogId Blog objectId
 * @apiSuccess 204
 */
blogController.deleteBlog = (req, res, next) => {
  const blogId = req.params.blogId;
  Blog.removeById(blogId).then(() => {
    res.success(null, 204);
  }).catch(next);
};





/**
 * @api {get} /blogs/:blogId/comments Get all comment in a blog
 * @apiName getCommentsByBlogId
 * @apiGroup Comment
 *
 * @apiParam {String} blogId targetBlogId
 * @apiSuccess {Object[]} comments
 */
blogController.getCommentsByBlogId = (req, res, next) => {
  const blogId = req.params.blogId;
  Comment.getCommentNestedByBlogId(blogId).then(comments => {
    res.success(comments);
  }).catch(next);
};

/**
 * @api {post} /blogs/:blogId/comments Create new comment belong to a blog
 * @apiName CreateComment
 * @apiGroup Comment
 *
 * @apiParam {String} blogId targetBlogId
 * @apiParam {Object} comment Comment
 * @apiSuccess {Object} comment Created comment
 */
blogController.createComment = (req, res, next) => {
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
};


module.exports = blogController;