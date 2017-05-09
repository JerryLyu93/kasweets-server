'use strict';

/**
 * Module dependencies.
 * address Mongoose Model
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Address Schema
 */

var AddressSchema = new Schema({
  'user_id': {type: String, required: true},
  name: {type: String, required: true, trim: true},
  telephone: {type: String, required: true, trim: true},
  address: {type: String, required: true, trim: true},
  created: {type: Date, default: Date.now}
})

mongoose.model('Address', AddressSchema)
