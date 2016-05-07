const messageController = require('express').Router();
const Message = require('../models').Message;
const HttpError = require('../common/http-error');
const assertExisted = require('../middlewares/database').assertObjectExisted;
const utils = require('../common/utils');

messageController.route('/')

  /**
   * @api {get} /messages Get all messages
   * @apiName GetAllMessages
   * @apiGroup Message
   * @apiSuccess {Object[]} message All message
   */
  .get((req, res, next) => {
    Message.getAllMessages().then(messages => {
      res.success(messages);
    }).catch(next);
  })


  /**
   * @api {post} /messages Create a new message
   * @apiName CreateMessage
   * @apiGroup Message
   *
   * @apiParam {Object[]} message
   * @apiSuccess (201) {Object[]} message
   */
  .post((req, res, next) => {
    const body = req.body;
    utils.verifyUserForm(body);
    const _message = Object.assign(new Message(), body);
    _message.save().then(message => {
      res.success(message, 201);
    }).catch(next);
  });

messageController.route('/:messageId')
  .all(assertExisted('messageId', Message))

  /**
   * @api {delete} /messages/messageId Delete message
   * @apiName DeleteMessage
   * @apiGroup Message
   * @apiSuccess 204
   */
  .delete((req, res, next) => {
    const messageId = req.params.messageId;
    Message.removeMessageById(messageId).then(() => {
      res.success(null, 204);
    }).catch(next);
  });

module.exports = messageController;