'use strict';
const commentController = require('express').Router();
const utils = require('../common/utils');
const HttpError = require('../common/http-error');
const assertExisted = require('../middlewares/database').assertObjectExisted;
const models = require('../models');
const Blog = models.Blog;
const Comment = models.Comment;

commentController.route('/')

  /**
   * @api {get} /comments Get all comments
   * @apiName GetAllComments
   * @apiGroup Comment
   * @apiSuccess {Object[]} comments AllComments
   */
  .get((req, res, next) => {
    Comment.getAllComments().then(comments => {
      res.success(comments);
    }).catch(next)
  });


commentController.route('/:commentId')
  .all(assertExisted('commentId', Comment))

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
   * @apiName DeleteComment
   * @apiGroup Comment
   *
   * @apiParam {String} commentId
   * @apiSuccess 204
   */
  .delete((req, res, next) => {
    const commentId = req.params.commentId;
    Promise.all([
        Blog.removeCommentByCommentId(commentId),
        Comment.removeCommentById(commentId)
    ]).then(() => {
      res.success(null, 204);
    }).catch(next);

  });

module.exports = commentController;