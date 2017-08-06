'use strict';

const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const user = require('./user')
const designPatterns = require('../controllers/designpatterns')

module.exports = function (app) {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))

  app.route('/')
    .get(function (req, res) {
      res.send('Hello World')
    });
  app.route('/designpatterns/:name')
    .get(function (req, res) {
      designPatterns(req, res)
    })
  user(app)
}
