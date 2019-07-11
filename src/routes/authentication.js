module.exports = function(app) {
  const authenticationController = require('../controllers/authentication.js');

  app.route('/api/login')
    .post(authenticationController.try_login);

  app.route('/api/logout')
    .get(authenticationController.do_logout);
};
