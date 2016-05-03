'use strict';
const commentController = require('express').Router();
const utils = require('../common/utils');
const HttpError = require('../common/http-error');
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
  .all((req, res, next) => {
    const commentId = req.params.commentId;
    if (utils.isObjectId(commentId)) {
      Comment.getCommentById(commentId).then(comment => {
        if (!comment) {
          throw new HttpError.NotFoundError('Comment not found');
        }
        next();
      }).catch(next);
    } else {
      next('route')
    }
  })

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
    Comment.deleteCommentById(commentId).then(() => {
      res.success(null, 204);
    }).catch(next);
  });

module.exports = commentController;