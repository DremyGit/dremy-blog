'use strict';

const Comment = require('../models').Comment;
const utils = require('../common/utils');

const messageController = {};

/**
 * @api {get} /messages Get all messages
 * @apiName GetAllMessages
 * @apiGroup Message
 * @apiSuccess {Object[]} message All message
 */
messageController.getAllMessages = (req, res, next) => {
  const isList = req.query.list;
  if (isList) {
    Comment.getAllMessages().then(messages => {
      res.success(messages);
    }).catch(next);
  } else {
    Comment.getMessagesNested().then(messages => {
      res.success(messages);
    }).catch(next);
  }
};


/**
 * @api {post} /messages Create a new message
 * @apiName CreateMessage
 * @apiGroup Message
 *
 * @apiParam {Object[]} message
 * @apiSuccess (201) {Object[]} message
 */
messageController.createMessage = (req, res, next) => {
  const body = req.body;
  const replyId = req.body.reply_id;
  let rootId;
  utils.verifyUserForm(body);
  const _message = Object.assign(new Comment(), body);
  if (replyId) {
    Comment.getCommentById(replyId).then(replyTo => {
      _message.reply_to = replyTo.toObject();
      _message.root_id = rootId = replyTo.root_id || replyId;
      return Comment.createMessage(_message);
    }).then(message => {
      res.success(message, 201);
      Comment.updateRootComment(rootId, message._id);
    }).catch(next);
  } else {
    Comment.createMessage(_message).then(message => {
      res.success(message, 201);
    }).catch(next);
  }
};

/**
 * @api {delete} /messages/messageId Delete message
 * @apiPermission admin
 * @apiName DeleteMessage
 * @apiGroup Message
 * @apiSuccess 204
 */
messageController.deleteMessage = (req, res, next) => {
  const messageId = req.params.messageId;
  Comment.removeMessageById(messageId).then(() => {
    res.success(null, 204);
  }).catch(next);
};

module.exports = messageController;