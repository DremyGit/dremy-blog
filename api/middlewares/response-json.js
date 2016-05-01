const responseJson = (req, res, next) => {
  res.success = (result, code) => {
    code = code || 200;
    if (code < 400) {
      res.status(code).json({
        statusCode: code,
        result: result,
        error: ''
      });
    } else {
      res.status(code).json({
        statusCode: code,
        error: result,
        result: ''
      })
    }
  };
  next();
};

module.exports = responseJson;