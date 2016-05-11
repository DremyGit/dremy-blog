'use strict';
const commentController = require('express').Router();
const utils = require('../common/utils');
const assertAndSetId = require('../middlewares/database').assertAndSetId;
const adminRequired = require('../middlewares/auth').adminRequired;
const models = require('../models');
const Blog = models.Blog;
const Comment = models.Comment;

commentController.route('/')

  /**
   * @api {get} /comments Get all comments
   * @apiPermission admin
   * @apiName GetAllComments
   * @apiGroup Comment
   * @apiSuccess {Object[]} comments AllComments
   */
  .get(adminRequired, (req, res, next) => {
    Comment.getAllComments().then(comments => {
      res.success(comments);
    }).catch(next)
  });


commentController.route('/:commentId')
  .all(assertAndSetId('commentId', Comment))

  /**
   * @api {get} /comments/:commentId Get comment by id
   * @apiName getCommentById
   * @apiGroup Comment
   *
   * @apiParam {String} commentId
   * @apiSuccess {Object} comment
   */
  .get((req, res, next) => {
    const commentId = req.params.commentId;
    Comment.getCommentById(commentId).then(comment => {
      res.success(comment);
    }).catch(next);
  })

  /**
   * @api {delete} /comments/:commentId Delete comment by id
   * @apiPermission admin
   * @apiName DeleteComment
   * @apiGroup Comment
   *
   * @apiParam {String} commentId
   * @apiSuccess 204
   */
  .delete(adminRequired, (req, res, next) => {
    const commentId = req.params.commentId;
    Comment.getCommentById(commentId).then(comment => {
      return Promise.all([
        Comment.removeCommentById(commentId),
        comment.root_id && Comment.removeRootComment(comment.root_id, comment._id),
        Blog.decreaseBlogCommentCount(comment.blog.toString())
      ]);
    }).then(() => {
      res.success(null, 204);
    }).catch(next);
  });


module.exports = commentController;