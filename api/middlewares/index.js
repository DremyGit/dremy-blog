const responseJson = require('./response-json');
const errorHandling = require('./error-handling');
const middlewares = (req, res, next) => {
  responseJson(req, res, next);
};

exports.all = middlewares;
exports.errorHandling = errorHandling;