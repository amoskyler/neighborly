var http = require('http');
var app = require('./express');

var apis = require('./apis');

var httpServer = http.createServer(app);

module.exports = httpServer;
