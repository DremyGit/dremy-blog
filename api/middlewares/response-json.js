const responseJson = (req, res, next) => {
  res.success = (result, code) => {
    code = code || 200;
    if (code < 400) {
      res.status(code).json(result);
    }
  };
  res.error = (errorMessage, code) => {
    res.status(code).json({
      statusCode: code,
      message: errorMessage
    })
  };
  next();
};


module.exports = responseJson;