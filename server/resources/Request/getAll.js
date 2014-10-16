var db = require('../../db');
var Request = db.model('Request');

module.exports = function(req, res, next) {
  var q;
  // if (!req.isAuthenticated()) {
  //   return res.status(403).end();
  // }
  q = Request.find({});
  return q.exec(function(err, locations) {
    console.log(locations);
    if (err != null) {
      return next(err);
    }
    if(err == null){
      //return res.status(404).end();
    }
    return res.status(200).json(locations);
  });
};
