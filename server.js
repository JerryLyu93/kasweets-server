'use strict';

// other dependencies
var lodash = require('lodash')
global._ = lodash
require('dotenv').config({path: './.env'})

// mongo
var fs = require('fs')
const join = require('path').join;
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI);

const models = join(__dirname, 'app/models');
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)));

// start server
var express = require('express');
var app = express();
var routes = require('./app/routes/index.js');

routes(app)

var port = process.env.PORT || 3000
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
