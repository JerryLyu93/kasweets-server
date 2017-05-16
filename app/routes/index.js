'use strict';

const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const user = require('./user')

module.exports = function (app) {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))

  app.route('/')
    .get(function (req, res) {
      res.send('Hello World')
    });

  user(app)
}
