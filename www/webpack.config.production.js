const webpack = require('webpack');
const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack.isomorphic-tools'));
const config = require('./config');

const rootPath = path.resolve(__dirname, '.');
const assetsPath = path.join(rootPath, 'dist');

module.exports = {
  context: rootPath,
  entry: {
    bundle: './client',
  },
  output: {
    path: assetsPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: `${config.staticHost + config.staticPath}/`,
  },
  plugins: [
    new CleanPlugin([assetsPath, `${rootPath}/webpack-assets.json`], { root: rootPath }),
    new ExtractTextPlugin('[name]-[chunkhash].css', { allChunks: true }),
    new CopyWebpackPlugin([
      // {output}/file.txt
      { from: './assets/highlightjs/highlight.pack.js' },
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    webpackIsomorphicToolsPlugin,
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'react-hot!babel',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[hash:base64:5]!sass!autoprefixer?{browsers:["> 5%"]}'),
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png)$/,
        loader: 'url?limit=8192',
        exclude: /node_modules/,
      },
      {
        test: /\.html?$/,
        loader: 'html',
        exclude: /node_modules/,
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff',
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff',
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream',
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file',
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=8192&mimetype=image/svg+xml',
      },
    ],
  },
  sassLoader: {
    outputStyle: 'compressed',
  },

};
