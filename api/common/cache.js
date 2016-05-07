const Redis = require('ioredis');
const config = require('../config');
const cache = {};

const redis = new Redis(config.redis);

cache.get = (key, callback) => {
  var timeBegin = new Date();
  return new Promise((resolve, reject) => {
    redis.get(key, (err, result) => {
      if (err) {
        reject(err);
      } else if (!result) {
        resolve();
      } else {
        result = JSON.parse(result);
        console.log('[Redis]', 'Cache hitting in', new Date() - timeBegin, 'ms');
        resolve(result);
      }
      if (callback) callback(err, result);
    })
  })
};

cache.set = (key, value, time, callback) => {
  var timeBegin = new Date();
  value = JSON.stringify(value);
  return new Promise((resolve, reject) => {
    if (typeof time === 'function') {
      callback = time;
      time = null;
    }

    if (!time) {
      redis.set(key, value, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
        console.log('[Redis]', 'Save cache in', new Date() - timeBegin, 'ms');
        if (callback) callback(err, res);
      })
    } else {
      redis.setex(key, time, value, (err, res)=> {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
        console.log('[Redis]', 'Save cache in', new Date() - timeBegin, 'ms');
        if (callback) callback(err, res);
      });
    }
  });
};

cache.del = (key, callback) => {
  return new Promise((resolve, reject) => {
    redis.del(key, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
      if (callback) callback(err, res);
    });
  });
};

module.exports = cache;