module.exports = function(app) {
  const classroomsController = require('../controllers/classrooms.js');

  app.route('/api/classrooms')
    .get(classroomsController.list_classrooms);

  app.route('/api/classrooms/activities')
    .get(classroomsController.list_classrooms_activities);

  app.route('/api/classrooms/:id/reports')
    .post(classroomsController.add_report);
};
