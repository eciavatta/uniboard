module.exports = function(app) {
  const coursesController = require('../controllers/courses.js');

  app.route('/api/courses')
    .get(coursesController.list_courses);
};
