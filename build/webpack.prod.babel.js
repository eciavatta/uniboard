const merge = require("webpack-merge");
const base = require('./webpack.base.babel');

module.exports = merge(base, {
  mode: 'production',
  entry: './public/index.jsx',
  output: {
    filename: '[name].[hash].js'
  }
});
