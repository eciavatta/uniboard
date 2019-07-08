module.exports = function(app) {
  const indexController = require('../controllers/index.js');

  app.route('/')
    .get(indexController.show_index);
};
