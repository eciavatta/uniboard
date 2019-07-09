const passport = require('passport');

exports.showLogin = function(req, res) {

};
exports.try_login = function(req, res, next) {
  console.log("user:");
  console.log(req.user);
  passport.authenticate('local', {}, function (err, user, data) {
    if (err) {
      console.log("Error while authenticating");
      console.log(err);
      res.status(500);
      res.send("Unexpected error while logging in");
    } else if (user) {
      req.logIn(user, function(err) {
        if (err) {
          console.log("Error while logging in");
          console.log(err);
          res.status(500);
          res.send("Unexpected error while logging in");
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
