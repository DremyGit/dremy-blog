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
   * @apiSuccess (200) {comments}
   */
  .get((req, res, next) => {
    Comment.getAllComments().then(comments => {
      res.success(comments);
    }).catch(next)
  })


  /**
   * @api {post} /comments Create new comment
   * @apiName GetAllComments
   * @apiGroup Comment
   * @apiSuccess (201) {comment}
   */
  .post((req, res, next) => {
    const body = req.body;
    const blogId = req.query.blogId;
    const _comment = new Comment({
      user: body.user,
      target: body.target,
      email: body.email,
      content: body.content
    });
    if (!utils.isObjectId(blogId)) {
      throw new HttpError.BadRequestError('Blog id error');
    }
    let comment_g;
    _comment.save().then(comment => {
      comment_g = comment;
      return Blog.addComment(blogId, comment._id)
    }).then(() => {
      res.success(comment_g, 201);
    }).catch(next);
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
   * @apiSuccess (204)
   */
  .delete((req, res, next) => {
    const commentId = req.params.commentId;
    Comment.deleteCommentById(commentId).then(() => {
      res.success(null, 204);
    }).catch(next);
  });

module.exports = commentController;