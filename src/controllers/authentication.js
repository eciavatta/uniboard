const passport = require('passport');
const unexpectedError = require('../utils').unexpectedError;

exports.try_login = function(req, res, next) {
  console.log("user:");
  console.log(req.user);
  passport.authenticate('local', {}, function (err, user, data) {
    if (err) {
      unexpectedError(err, res);
    } else if (user) {
      req.logIn(user, function(err) {
        if (err) {
          unexpectedError(err, res);
        } else {
          res.json(user);
        }
      });
    } else {
      console.log("User error while authenticating");
      console.log(data);
      res.status(401);
      res.send("Invalid username or password");
    }
  })(req, res, next);
};

exports.do_logout = function(req, res) {
  req.logout();
  res.status(204);
  res.send();
};
