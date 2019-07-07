const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const merge = require("webpack-merge");
const base = require('./webpack.base.babel');

module.exports = merge(base, {
  mode: 'production',
  entry: {
    vendors: './public/vendors.js',
    bundle: './public/index.jsx'
  },
  output: {
    filename: '[name].[hash].js'
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  }
});
