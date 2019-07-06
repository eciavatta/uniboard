const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: './server.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
    ]
  },
  // https://webpack.js.org/configuration/externals/#externals
  // https://github.com/liady/webpack-node-externals
  externals: nodeExternals(),
};
