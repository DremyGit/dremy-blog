const Admin = require('../models').Admin;
const HttpError = require('some-http-error');
const jwt = require('../common/jwt');

const authorizationController = {};

/**
 * @api {post} /authorization Authorization and get token
 * @apiName Authorization
 * @apiGroup Authorization
 *
 * @apiParam {String} username
 * @apiParam {String} password
 * @apiSuccess {String} token
 */
authorizationController.authorize = (req, res, next) => {
  const body = req.body;
  Admin.isAdmin(body.username, body.password).then(isAdmin => {
    if(isAdmin) {
      const token = jwt.create({name: body.username});
      res.success({token: token});
    } else {
      next(new HttpError.BadRequestError('Username or password error'));
    }
  })
};

module.exports = authorizationController;