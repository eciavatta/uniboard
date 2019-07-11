module.exports = function(app) {
  const usersController = require('../controllers/users.js');

  app.route('/api/users')
    .post(usersController.add_user);

  app.route('/api/users/self')
    .get(usersController.get_self);

  //corsi che l'utente segue

  app.route('/api/users/self/courses')
    .get(usersController.get_courses_self);

  app.route('/api/users/self/courses/:courseId')
    .post(usersController.add_course_self)
    .delete(usersController.remove_course_self);

  app.route('/api/users/self/courses/schedule')
    .get(usersController.get_courses_schedule_self);
};
