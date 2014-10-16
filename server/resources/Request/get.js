var db = require('../../db');
var Request = db.model('Request');

module.exports = function(req, res, next) {
  var isOwner;
  var q;
  if (typeof req.params.id !== 'string') {
    return next(new Error('Invalid id parameter'));
  }
    q = Request.findOne({
      location: req.params.id
    });
  return q.exec(function(err, location) {
    if (err != null) {
      return next(err);
    }
    if (location == null) {
      return res.status(404).end();
    }
    location = location.toJSON();
    if (!isOwner) {
      delete location.token;
    }
    return res.status(200).json(location);
  });
};
