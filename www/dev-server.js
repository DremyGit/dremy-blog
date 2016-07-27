const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
//const webpackDevMiddleware = require('webpack-dev-middleware');
//const webpackHotMiddleware = require('webpack-hot-middleware');
const path = require('path');
const config = require('./webpack.config.dev');

const port = 3001;
const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
  contentBase: 'http://localhost:' + port,
  publicPath: config.output.publicPath,
  quiet: true,
  noInfo: true,
  inline: true,
  lazy: false,
  headers: {'Access-Control-Allow-Origin': '*'},
  hot: true,
  stats: {
    colors: true,
    chunkModules: false
  }

  //proxy: {
  //  '/api/*': {
  //    target: 'http://localhost:5760',
  //    rewrite: function(req) {
  //      req.url = req.url.replace(/^\/api/, '');
  //    }
  //  },
  //  '*': {
  //    target: 'http://localhost:4000'
  //  }
  //}
});

//server.app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
//server.app.use(webpackHotMiddleware(compiler));

//server.app.use(function (req, res, next) {
//  var ext = path.extname(req.url);
//  console.log(req.url);
//  if ((ext === '' || ext === '.html') || req.url === '/') {
//    res.sendFile(__dirname + '/index.html');
//    console.log('haha');
//  } else {
//    next();
//  }
//});

server.listen(port, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:' + port);
});