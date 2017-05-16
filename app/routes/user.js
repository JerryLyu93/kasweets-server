"use strict";

var user = require('../controllers/users')

module.exports = function (app) {
  app.route('/user/create')
    .post(user.create)

  app.route('/user/load')
    .get(user.load)
}
