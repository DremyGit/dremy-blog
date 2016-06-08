const Admin = require('../models').Admin;
const HttpError = require('some-http-error');
const jwt = require('../common/jwt');

/**
 * @api {post} /authorization Authorization and get token
 * @apiName Authorization
 * @apiGroup Authorization
 *
 * @apiParam {String} username
 * @apiParam {String} password
 * @apiSuccess {String} token
 */
const authorizationController = (req, res, next) => {
  const body = req.body;
  Admin.isAdmin(body.username, body.password).then(isAdmin => {
    if(isAdmin) {
      const token = jwt.create({name: body.username});
      res.success({token: token});
    } else {
      next(new HttpError.UnauthorizedError('Username or password error'));
    }
  })
};

module.exports = authorizationController;