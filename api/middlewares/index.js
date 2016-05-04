const responseJson = require('./response-json');
const database = require('./database');
const errorHandling = require('./error-handling');
const middlewares = (req, res, next) => {
  responseJson(req, res, next);
};

exports.all = middlewares;
exports.database = database;
exports.errorHandling = errorHandling;