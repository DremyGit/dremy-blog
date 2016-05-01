const errorHandlling = (err, req, res, next) => {
  res.error(err, 500);
};

module.exports = errorHandlling;