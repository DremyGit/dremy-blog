'use strict';
const utils = require('../common/utils');
const models = require('../models');
const Blog = models.Blog;
const Comment = models.Comment;

const commentController = {};

/**
 * @api {get} /comments Get all comments
 * @apiPermission admin
 * @apiName GetAllComments
 * @apiGroup Comment
 * @apiSuccess {Object[]} comments AllComments
 */
commentController.getAllComments = (req, res, next) => {
  Comment.getAllComments().then(comments => {
    res.success(comments);
  }).catch(next)
};


/**
 * @api {get} /comments/:commentId Get comment by id
 * @apiName getCommentById
 * @apiGroup Comment
 *
 * @apiParam {String} commentId
 * @apiSuccess {Object} comment
 */
commentController.getCommentById = (req, res, next) => {
  const commentId = req.params.commentId;
  Comment.getCommentById(commentId).then(comment => {
    res.success(comment);
  }).catch(next);
};

/**
 * @api {delete} /comments/:commentId Delete comment by id
 * @apiPermission admin
 * @apiName DeleteComment
 * @apiGroup Comment
 *
 * @apiParam {String} commentId
 * @apiSuccess 204
 */
commentController.deleteComment = (req, res, next) => {
  const commentId = req.params.commentId;
  Comment.getCommentById(commentId).then(comment => {
    return Promise.all([
      Comment.removeCommentById(commentId),
      comment.root_id && Comment.removeRootComment(comment.root_id, comment._id),
      Blog.increaseBlogCommentCount(comment.blog.toString(), -1)
    ]);
  }).then(() => {
    res.success(null, 204);
  }).catch(next);
};

/**
 * @api {post} /comments/:commentId/supports Add support count
 * @apiName AddSupport
 * @apiGroup Comment
 *
 * @apiParam {String} commentId
 * @apiSuccess 201
 */
commentController.addSupport = (req, res, next) => {
  const commentId = req.params.commentId;
  Comment.updateSupportCount(commentId, 1).then(() => {
    res.success('', 201);
  }).catch(next);
};

/**
 * @api {delete} /comments/:commentId/supports Decrease support count
 * @apiName DecreaseSupport
 * @apiGroup Comment
 *
 * @apiParam {String} commentId
 * @apiSuccess 204
 */
commentController.decreateSupport = (req, res, next) => {
  const commentId = req.params.commentId;
  Comment.updateSupportCount(commentId, -1).then(() => {
    res.success('', 201);
  }).catch(next);
};


module.exports = commentController;