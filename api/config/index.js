var privateConfig = require('./private');
var config = {
  host: 'https://dremy.cn',
  port: "5760",
  mongodb: "mongodb://localhost/dremy_blog",
  redis: {
    port: 6379,
    host: '127.0.0.1'
  },
  smtp: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: privateConfig.smtp_account,
    proxy: 'socks5://localhost:1080/'
  }

};

module.exports = config;