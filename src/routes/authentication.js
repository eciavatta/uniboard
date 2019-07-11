module.exports = function(app) {
  const authenticationController = require('../controllers/authentication.js');

  app.route('/login')
    .post(authenticationController.try_login)
    .delete(authenticationController.do_logout);
};
