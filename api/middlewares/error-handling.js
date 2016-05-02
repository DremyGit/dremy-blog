const errorHandlling = (err, req, res, next) => {
  var statusCode = err.statusCode || 500;
  res.error(err, statusCode);
};

module.exports = errorHandlling;