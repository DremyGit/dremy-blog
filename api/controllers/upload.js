const uploadController = require('express').Router();
const privates = require('../config/private');
const adminRequired = require('../middlewares/auth').adminRequired;
const qiniu = require("qiniu");

uploadController.get('/', (req, res, next) => {
  qiniu.conf.ACCESS_KEY = privates.qiniu.ACCESS_KEY;
  qiniu.conf.SECRET_KEY = privates.qiniu.SECRET_KEY;
  var bucket = 'dremy';
  res.success({uptoken: new qiniu.rs.PutPolicy(bucket).token()});
  //res.success({uptoken: 'haha'})
});

module.exports = uploadController;