const config = require('./config');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const middlewares = require('./middlewares');


app.use(bodyParser.json());
app.listen(config.port);
app.use(middlewares.all);

const router = require('./config/router');
router(app);

app.use(middlewares.errorHandling);


//if ('development' == env) {
//  app.set('showStackError', true);
//  mongoose.set('debug', true);
//}
console.log('APP started on  port ' + config.port);

module.exports = app;