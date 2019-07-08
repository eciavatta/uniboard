const path = require('path');

exports.show_index = function(req, res) {
  res.sendFile(path.resolve('dist/index.html'));
};
