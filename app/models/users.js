'use strict';

/**
 * Module dependencies.
 */

const crypto = require('crypto');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var User = new Schema({
  telephone: {type: String, require: true},
  password: {type: String, require: true},
  address: Array,
  current_address: Number,
  rank: {type: String, default: '1'},
  total_credit: {type: Number, default: 0},
  usable_credit: {type: Number, default: 0},
  created: { type: Date, default: Date.now },
  birthday: { type: Date }
});

module.exports = mongoose.model('User', User)
