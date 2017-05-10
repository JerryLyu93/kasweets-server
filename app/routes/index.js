'use strict';

var path = process.cwd();
var usersController = require('../controllers/users')

module.exports = function (app) {
  app.route('/')
    .get(function (req, res) {
      res.send('Hello World')
    });

  app.route('/createuser')
    .get(function (req, res) {
      usersController.create(req.query).then(result => {
        res.send(result)
      }).catch(err => {
        res.send(err.message)
      })
    })

  app.route('/getuser')
    .get(function (req, res) {
      usersController.load(req.query.telephone).then(result => {
        res.send(result)
      }).catch(err => {
        res.send(err.message)
      })
    })
}
