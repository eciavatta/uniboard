const createError = require('http-errors');
const express = require('express');
const path = require('path');
const app = express();
const passport = require('passport');
const bodyParser = require('body-parser');

const isProduction = process.env.NODE_ENV === 'production';

require('./db/connection');
require('./models/classroomsModel');
require('./models/activitiesModel');
require('./models/coursesModel');
require('./models/userPasswordsModel');
require('./models/usersModel');
require('./models/userReportsModel');

//middleware init
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('express-session')({secret: 'WnpHBAdguCYEN9XHnsGyfXR6OdWf9KrjAS', saveUninitialized: false, resave: true}));
app.use(passport.initialize());
app.use(passport.session());
require('./passportStrategyInit');

if (isProduction) {
  app.route('/').get((req, res) => res.sendFile(path.resolve('dist/index.html')));

  app.use('/dist', express.static(path.resolve('dist/static/')));
} else {
  let configDev = require('../build/webpack.dev.babel');
  let webpack = require('webpack');
  let compiler = webpack(configDev);

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: configDev.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.use('/static', express.static(path.resolve('static/')));

require('./routes/users')(app);
require('./routes/authentication')(app);
require('./routes/classrooms')(app);

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
