"use strict";

var user = require('../controllers/users')

module.exports = function (app) {
  app.route('/goods/create')
    .post(user.create)

  app.route('/goods/load')
    .get(user.load)
}
