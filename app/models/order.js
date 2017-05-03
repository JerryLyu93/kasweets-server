"use strict";

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var OrderSchema = new Schema({
  id: {type: Number},
  user_id: {type: Number},
  type: {type: String, default: 'normal'},
  status: {type: Number, default: 0},
  status_list: {type: Array, default: []},
  price_total: {type: Number, default: 0},
  created: {type: Date, default: Date.now},
  updated: {type: Date, default: Date.now},
  address_id: {type: Number, required: true},
  discount_id: {type: Number, required: true}
});

OrderSchema.methods = {
 /**
  * Schema Methods
  *
  * @param {String}
  *
  * @return {Boolean}
  * @api public
  */
}

mongoose.model('Order', OrderSchema)
