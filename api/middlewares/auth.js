const jwt = require('../common/jwt');
const HttpError = require('../common/http-error');
const auth = {};

auth.authorization = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const auth = req.auth = {isAuth: false, message: 'Unauthorized'};
  if (!authHeader) {
    return next();
  }

  const token = authHeader.split(' ')[1];
  if (authHeader.split(' ')[0] != 'Bearer' || !token) {
    auth.message = "Authorization type error";
    return next();
  }

  jwt.verify(token, (err, obj) => {
    if (err) {
      Object.assign(auth, err);
      return next();
    }
    auth.isAuth = true;
    delete auth.message;
    auth.user = obj;
    next();
  });
};

auth.adminRequired = (req, res, next) => {
  if (req.auth.isAuth) {
    next();
  } else {
    next(new HttpError.UnauthorizedError(req.auth.message));
  }
};

module.exports = auth;