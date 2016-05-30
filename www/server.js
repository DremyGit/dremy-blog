const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
//const webpackDevMiddleware = require('webpack-dev-middleware');
//const webpackHotMiddleware = require('webpack-hot-middleware');
const path = require('path');
const config = require('./webpack.config.dev');

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
  //contentBase: "dist",
  publicPath: '/static/',
  hot: true,

  quiet: false,
  noInfo: false,
  stats: {
    colors: true,
    chunkModules: false
  },

  proxy: {
    '/api/*': {
      target: 'http://localhost:5760',
      rewrite: function(req) {
        req.url = req.url.replace(/^\/api/, '');
      }
    }
  }
});

//server.app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
//server.app.use(webpackHotMiddleware(compiler));

server.app.use(function (req, res, next) {
  var ext = path.extname(req.url);
  console.log(req.url);
  if ((ext === '' || ext === '.html') || req.url === '/') {
    res.sendFile(__dirname + '/index.html');
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