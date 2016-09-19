const jwt = require('jsonwebtoken');
const privateConfig = require('../config/private');

exports.create = (obj, time, cert) => {
  cert = cert || privateConfig.jwt_cert;
  return jwt.sign(obj, cert, {
    algorithm: 'HS256',
    expiresIn: time || '30m'
  })
};

exports.verify = (token, cert, callback) => {
  return new Promise((resolve, reject) => {
    if (typeof cert === 'function') {
      callback = cert;
      cert = privateConfig.jwt_cert;
    }
    jwt.verify(token, cert, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
      callback(err, decoded);
    });
  })
};
