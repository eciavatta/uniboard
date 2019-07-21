const webpack = require('webpack');
const base = require('./webpack.base.babel');
const merge = require("webpack-merge");

module.exports = merge(base, {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './public/vendors.js',
    './public/index.jsx'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
