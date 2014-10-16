var db = require('../../db');
var Request = db.model('Request');

module.exports = function(req, res, next) {
  var q;
  if (typeof req.params.id !== 'string') {
    return next(new Error('Invalid id parameter'));
  }
    q = Request.find({
      location: req.params.id
    });
  return q.exec(function(err, location) {
    if (err != null) {
      return next(err);
    }
    if (location == null) {
      return res.status(404).end();
    }
    return res.status(200).json(location);
  });
};
