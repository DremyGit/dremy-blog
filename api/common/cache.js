const Redis = require('ioredis');
const config = require('../config');
const cache = {};

const redis = new Redis(config.redis);

cache.get = (key) => {
  return new Promise((resolve, reject) => {
    redis.get(key).then(result => {
      if (!result) {
        resolve();
      } else {
        resolve(JSON.parse(result));
      }
    }).catch(reject);
  });
};

cache.set = (key, value, time) => {
  return new Promise((resolve, reject) => {
    value = JSON.stringify(value);
    if (!time) {
      redis.set(key, value).then(res => {
        resolve(res);
      }).catch(reject);
    } else {
      redis.setex(key, time, value).then(res => {
        resolve(res);
      }).catch(reject);
    }
  })
};

module.exports = cache;