const webpack = require('webpack');
const base = require('./webpack.base.babel');
const merge = require("webpack-merge");

module.exports = merge(base, {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './public/index.jsx'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
