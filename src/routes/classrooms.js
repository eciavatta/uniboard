module.exports = function(app) {
  const classroomsController = require('../controllers/classrooms.js');

  app.route('/api/classrooms')
    .get(classroomsController.list_classrooms);
};
