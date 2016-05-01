const responseJson = require('./response-json');
const middlewares = (req, res, next) => {
  responseJson(req, res, next);
};

module.exports = middlewares;