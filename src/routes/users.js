module.exports = function(app) {
  const usersController = require('../controllers/users.js');

  app.route('/api/users')
    .post(usersController.add_user);

  app.route('/api/users/self')
    .get(usersController.get_self);
};
