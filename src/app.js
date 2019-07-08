const createError = require('http-errors');
const express = require('express');
const path = require('path');
const app = express();

const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (isProduction) {
  app.use(require('./routes/index'));

  app.use('/static', express.static(path.resolve('dist/static/')));
} else {
  let configDev = require('../build/webpack.dev.babel');
  let webpack = require('webpack');
  let compiler = webpack(configDev);

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: configDev.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).json({
    message: err.message,
    error: err
  });
});

module.exports = app;
