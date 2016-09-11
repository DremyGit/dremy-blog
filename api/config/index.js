var config = {
  host: 'https://dremy.cn',
  port: "5760",
  mongodb: "mongodb://localhost/dremy_blog",
  redis: {
    port: 6379,
    host: '127.0.0.1'
  },

  // Private
  jwt_cert: 'test'
};

module.exports = config;