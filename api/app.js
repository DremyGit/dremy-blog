const config = require('./config');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const middlewares = require('./middlewares');

mongoose.connect(config.mongodb);
app.use(bodyParser.urlencoded({extended: true}));
app.use(session(config.session));
app.listen(config.port);
app.use(middlewares);

const router = require('./config/router');
router(app);
app.use((err, req, res, next) => {
  res.json("haha")
});

const env = process.env.NODE_ENV || 'development';
if ('development' == env) {
  app.set('showStackError', true);
  mongoose.set('debug', true);
}
console.log('APP started on  port ' + config.port);