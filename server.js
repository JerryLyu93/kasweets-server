'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var lodash = require('lodash')
global._ = lodash

var app = express();
require('dotenv').config({path: './.env'})
mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

routes(app)

var port = process.env.PORT || 3000
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
