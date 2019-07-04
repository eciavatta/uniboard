var createError = require('http-errors');
var express = require('express');
var path = require('path');
var webpack = require('webpack');
const configDev = require('../build/webpack.dev.babel');

const isProd = process.env.NODE_ENV === 'production';

const indexRouter = require('./routes/index');

const app = express();
const compiler = webpack(configDev);

if (!isProd) {
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: configDev.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler));

  app.get('/', (req, res, next) => {
    res.sendFile(path.join(compiler.outputPath, 'index.html'));
  });
} else {

  app.use('/', indexRouter);

  app.use(express.static('dist/public', {
    setHeaders(res, resPath) {
      // do not set Cache-Control for index page
      const isIndexFile = resPath.endsWith('/index.html');
      if (!isIndexFile) {
        res.setHeader('Cache-Control', '86400');
      }
    }
  }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static(path.resolve('dist')));

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

app.listen(3000, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Listening at http://localhost:3000/');
});
