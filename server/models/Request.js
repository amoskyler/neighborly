
var Schema = require('mongoose').Schema;

var noWrite = function() {
  var perms;
  perms = {
    read: true,
    write: false
  };
  return perms;
};

var Request = new Schema({
  title: {
    type: String,
    required: true,
    authorize: noWrite
  },
  description: {
    type: String
  },
  location: {
    type: String
  }
});

Request.set('toJSON', {
  getters: true,
  virtuals: true
});

Request.set('toObject', {
  getters: true,
  virtuals: true
});

Request.methods.authorize = function(req) {
  var perms;
  perms = {
    read: true,
    write: req.user.username === this.username,
    'delete': false
  };
  return perms;
};

Request.statics.authorize = function() {
  var perms;
  perms = {
    read: true,
    write: false
  };
  return perms;
};

Request.statics.me = function(req, cb) {
  return cb(null, req.user);
};

Request.statics.byHandle = function(_arg, cb) {
  var query;
  query = _arg.query;
  if (!(typeof query.username === 'string' && query.username.length > 0)) {
    return cb(new Error('Missing username parameter'));
  }
  return this.findOne({
    username: query.username
  }, cb);
};

module.exports = Request;
