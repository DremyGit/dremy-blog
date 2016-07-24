const qiniu = require("qiniu");

if (process.env.NODE_ENV !== 'test') {
  var privates = require('../config/private');
}

const uploadController = {};

/**
 * @api {get} /uptoken Get Qiniu uptoken
 * @apiName GetUpToken
 * @apiGroup Upload
 *
 * @apiSuccess {String} uptoken Qiniu uptoken
 */
uploadController.getUptoken = (req, res, next) => {
  qiniu.conf.ACCESS_KEY = privates && privates.qiniu.ACCESS_KEY || '';
  qiniu.conf.SECRET_KEY = privates && privates.qiniu.SECRET_KEY || '';
  var bucket = 'dremy';
  res.success({uptoken: new qiniu.rs.PutPolicy(bucket).token()});
};

module.exports = uploadController;