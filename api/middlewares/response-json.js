const responseJson = (req, res, next) => {
  var time_begin = new Date();
  res.success = (result, code) => {
    code = code || 200;
    res.status(code).json(result);
    console.log(new Date().toLocaleString(),'[Req]',req.method,req.originalUrl,'in',new Date() - time_begin,'ms');
  };
  res.error = (errorMessage, code) => {
    res.status(code).json({
      statusCode: code,
      message: errorMessage
    });
    console.error(new Date().toLocaleString(),'[Req]',req.method,req.originalUrl,'in',new Date() - time_begin,'ms',code,errorMessage);
  };
  next();
};


module.exports = responseJson;