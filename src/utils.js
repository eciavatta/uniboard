const crypto = require('crypto');

/**
 * @param password the password string
 * @param salt the salt string
 * @param callback callback function (error, hash string)
 */
exports.hashPassword = function(password, salt, callback) {
  crypto.pbkdf2(password, salt, 10000, 256, 'sha256', function(err, hash) {
    if (hash) {
      hash = hash.toString('base64');
    }
    callback(err, hash);
  });
};

/**
 * Logs an error and sends to the caller a 500
 * @param err
 * @param res
 */
exports.unexpectedError = function(err, res) {
  console.log(err);
  res.status(500);
  res.send("An unexpected error occurred while performing the request");
};

/**
 * Ensure the request is from an authenticated user.
 * If the request is from an authenticated source this returns true, else this sends a 403 error and returns false
 * Example of use:
 * if (ensureAuthenticated(req,res)) {
 *   //handle request;
 * }
 * @param req
 * @param res
 */
exports.ensureAuthenticated = function(req, res) {
  if (!req.user) {
    res.status(403);
    res.send("You need to be authenticated to perform this operation");
    return false;
  }
  return true;
};
