const passport = require('passport');
const PassportLocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const UserPassword = mongoose.model('UserPassword');
const hashPassword = require('./utils').hashPassword;

passport.use(new PassportLocalStrategy(
  function(username, password, cb) {
    User.findOne({ $or:[ {'username': username}, {'email': username}]}, function (err, user) {
      if (err) {
        cb(err);
      } else if (!user) {
        cb(null, false, "No user found");
      } else {
        UserPassword.findById(user._id).select({'__v': 0})
          .then(function (userPassword) {
            hashPassword(password, userPassword.salt, function (err, hashedPassword) {
              if (userPassword.hash !== hashedPassword) {
                cb(null, false, "Password is wrong"); }
              else {
                cb(null, user);
              }
            });
          }, function (err) {
            cb(err);
          })
      }
    });
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function (err, user) {
    if (err) {
      cb(err);
    } else {
      cb(null, user);
    }
  });
});
