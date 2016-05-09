const config = require('./config');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const middlewares = require('./middlewares');
const router = require('./config/router');

app.use(middlewares.responseJson);
app.listen(config.port);
app.use(bodyParser.json());
app.use(middlewares.authorization);

router(app);

app.use(middlewares.errorHandling);


//if ('development' == env) {
//  app.set('showStackError', true);
//  mongoose.set('debug', true);
//}
console.log('APP started on  port ' + config.port);

module.exports = app;