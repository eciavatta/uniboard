const passportStrategyInit = require('passport');
const PassportLocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const UserPassword = mongoose.model('UserPassword');
const hashPassword = require('./utils').hashPassword;

passportStrategyInit.use(new PassportLocalStrategy(
  function(username, password, cb) {
    User.findOne({'username': username}, function (err, user) {
      if (err) {
        cb(err);
      } else if (!user) {
        cb(null, false, "No user found");
      } else {
        UserPassword.findById(user._id, function (err2, userPassword) {
          hashPassword(password, userPassword.salt, function (err, hashedPassword) {
            if (userPassword.hash !== hashedPassword) {
              cb(null, false, "Password is wrong"); }
            else {
              cb(null, user);
            }
          });
        })
      }
    });
  }));

passportStrategyInit.serializeUser(function(user, cb) {
  console.log("Serialize user");
  cb(null, user._id);
});

passportStrategyInit.deserializeUser(function(id, cb) {
  console.log("DeSerialize user");
  User.findById(id, function (err, user) {
    if (err) {
      cb(err);
    } else {
      cb(null, user);
    }
  }).select({'__v': 0});
});
