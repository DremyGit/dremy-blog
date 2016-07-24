const config = require('./config');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const middlewares = require('./middlewares');
const controllers = require('./controllers');

app.use(middlewares.responseJson);
app.listen(config.port);
app.use(bodyParser.json());
app.use(middlewares.authorization);

app.use(controllers);

app.use(middlewares.errorHandling);


//if ('development' == env) {
//  app.set('showStackError', true);
//  mongoose.set('debug', true);
//}
console.log('APP started on  port ' + config.port);

module.exports = app;