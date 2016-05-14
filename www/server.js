const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
//const webpackDevMiddleware = require('webpack-dev-middleware');
//const webpackHotMiddleware = require('webpack-hot-middleware');
const path = require('path');
const config = require('./webpack.config.dev');

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
  contentBase: "dist",
  publicPath: '/static/',
  hot: true
});

//server.app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
//server.app.use(webpackHotMiddleware(compiler));

server.app.use(function (req, res, next) {
  var ext = path.extname(req.url);
  if ((ext === '' || ext === '.html')) {
    res.sendFile(__dirname + '/index.html')
    console.log('haha');
  } else {
    next();
  }
});

server.listen(3000, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:3000');
});