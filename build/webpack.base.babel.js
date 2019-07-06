const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  output: {
    filename: '[name].js',
    path: path.resolve('dist/static'),
    publicPath: isProduction ? '/static' : '/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.s?css$/,
        use: [isProduction ? MiniCssExtractPlugin.loader : 'style-loader', {
          loader: 'css-loader',
          options: isProduction ? {} : {
            sourceMap: false
          }
        },
        {
          loader: 'sass-loader',
          options: isProduction ? {} : {
            sourceMap: false
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: isProduction ? '../index.html' : 'index.html',
      template: 'public/index.html',

    }),

    new MiniCssExtractPlugin({
      filename: isProduction ? '[name].[hash].css' : '[name].css',
      chunkFilename: isProduction ? '[id].[hash].css' : '[id].css',
    })
  ]
};
