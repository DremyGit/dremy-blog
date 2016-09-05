const path = require('path');
const webpack = require('webpack');
const assetPath = path.join(__dirname, './static/dist');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack.isomorphic-tools'));
var devPort = require('./config').serverPort + 1;

module.exports = {
  context: path.resolve(__dirname, '.'),
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:' + devPort,
    'webpack/hot/only-dev-server',
    './client'
  ],
  output: {
    path: assetPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    //filename: 'bundle.js',
    //publicPath: '/static/'
    publicPath: 'http://localhost:' + devPort +'/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      { from: './assets/highlightjs/highlight.pack.js' }
    ]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true
    }),
    webpackIsomorphicToolsPlugin.development()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'react-hot!babel',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.scss$/,
        loader: 'style!css?modules&localIdentName=[local]_[name]_[hash:base64:5]!sass?outputStyle=expanded!autoprefixer?{browsers:["> 5%"]}',
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png)$/,
        loader: 'url?limit=4096',
        exclude: /node_modules/
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      }
    ]
  }
};