const responseJson = (req, res, next) => {
  res.success = (result, code) => {
    code = code || 200;
    if (code < 400) {
      res.status(code).json({
        statusCode: code,
        result: result,
        error: ''
      });
    }
  };
  res.error = (err, code) => {
    res.status(code).json({
      statusCode: code,
      error: err,
      result: ''
    })
  };
  next();
};


module.exports = responseJson;