'use strict'

const co = require('co').wrap
const mongoose = require('mongoose')
const Goods = mongoose.model('Goods')

/**
* create goods
*/
const create = co(function * (req, res) {
  const id = req.query.id
  Goods.findOne({})
})

const load = function (req, res) {
}

exports.create = create
exports.load = load
