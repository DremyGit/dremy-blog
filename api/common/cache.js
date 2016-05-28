const Redis = require('ioredis');
const config = require('../config');
const cache = {};

const redis = new Redis(config.redis);

redis.on('error', e => {
  if (e.code == 'ECONNREFUSED') {
    console.warn('Redis is not startup, disabled cache');
    redis.disconnect();
  }
});

// 从cache取出value
cache.get = (key, callback) => {
  var timeBegin = new Date();
  return new Promise((resolve, reject) => {
    redis.get(key, (err, result) => {
      if (!result) {
        resolve();
      } else {
        result = JSON.parse(result);
        console.log('[Redis]', 'Cache hitting', key, 'in', new Date() - timeBegin, 'ms');
        resolve(result);
      }
      if (callback) callback(err, result);
    });
  });
};

// 存入cache
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
        if (!res) {
          return resolve();
        }
        resolve(res);
        console.log('[Redis]', 'Save cache', key, 'in', new Date() - timeBegin, 'ms');
        if (callback) callback(err, res);
      });
    } else {
      redis.setex(key, time, value, (err, res)=> {
        if (!res) {
          return resolve();
        }
        resolve(res);
        console.log('[Redis]', 'Save cache', key, 'in', new Date() - timeBegin, 'ms');
        if (callback) callback(err, res);
      });
    }
  })
};

// 删除一个key
cache.del = (key, callback) => {
  return new Promise((resolve, reject) => {
    redis.del(key, (err, res) => {
      resolve(res);
      if (callback) callback(err, res);
    });
  });
};

// 根据通配符删除指定keys
cache.delMulti = (keyPattern) => {
  return new Promise((resolve, reject) => {
    redis.keys(keyPattern).then(keys => {
      const pipeline = redis.pipeline();
      keys.forEach(key => pipeline.del(key));
      return pipeline.exec();
    }).then(() => {
      resolve();
    }).catch(() => resolve());
  });
};

// 若命中则从cache中返回结果,若不命中则从数据库查询后存如cache
cache.getSet = function (key, promiseFunc, disableCache) {
  disableCache = disableCache || false;
  return new Promise((resolve, reject) => {
    cache.get(key).then(_value => {
      if (!disableCache && _value) {
        resolve(_value);
      } else {
        promiseFunc().then(value => {
          resolve(value);
          if (!disableCache) {
            cache.set(key, value, 60);
          }
        }).catch(reject);
      }
    })
  })
};

module.exports = cache;
