'use strict';

const bodyParser = require('body-parser');
const session = require('express-session')
const multer = require('multer');
const upload = multer();
const {getRandomString} = require('../common/libs')

const user = require('./user')
const goods = require('./goods')
const designPatterns = require('../controllers/designpatterns')
const start = require('../controllers/start')
const {ts} = require('../controllers/ts')

module.exports = function (app) {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(session({
    secret: 'pandalv',
    cookie: { maxAge: 60 * 1000 },
    resave: true,
    saveUninitialized: false
  }))
  
  app.route('/')
    .get(function (req, res) {
      res.send('Hello World')
    });
  app.route('/designpatterns/:name')
    .get(function (req, res) {
      designPatterns(req, res)
    })
  app.route('/start')
    .get(function (req, res) {
      start(req, res)
    })
  app.route('/ts')
    .get(function (req, res) {
      ts(req, res)
    })
  user(app)
  goods(app)
}

console.log('wow!')
