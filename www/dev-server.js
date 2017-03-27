const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.dev');

const port = 3001;
const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
  contentBase: `http://localhost:${port}`,
  publicPath: config.output.publicPath,
  quiet: true,
  noInfo: true,
  inline: true,
  lazy: false,
  headers: { 'Access-Control-Allow-Origin': '*' },
  hot: true,
  stats: {
    colors: true,
    chunkModules: false,
  },

  // proxy: {
  //  '/api/*': {
  //    target: 'http://localhost:5760',
  //    rewrite: function(req) {
  //      req.url = req.url.replace(/^\/api/, '');
  //    }
  //  },
  //  '*': {
  //    target: 'http://localhost:4000'
  //  }
  // }
});

server.listen(port, 'localhost', (err) => {
  if (err) {
    console.log(err);
  }
  console.info('DevServer runnint at localhost: %d', port);
});
