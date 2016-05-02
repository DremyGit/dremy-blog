const HttpError = require('../common/http-error').HttpError;

const errorHandlling = (err, req, res, next) => {
  var statusCode;
  var errorString = err.message;
  if (err instanceof HttpError) {
    statusCode = err.statusCode;
    //console.log('[' + statusCode + '] ' + errorString);
  } else {
    console.log(err.stack);
    statusCode = 500;
  }
  res.error(errorString, statusCode);
};

module.exports = errorHandlling;