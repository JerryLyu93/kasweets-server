'use strict'

const co = require('co').wrap
const mongoose = require('mongoose')
const Goods = mongoose.model('Goods')

/**
* create goods
*/
const create = co(function * (req, res) {
})

const load = function (req, res) {
}

exports.create = create
exports.load = load
