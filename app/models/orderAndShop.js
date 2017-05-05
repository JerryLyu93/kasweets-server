"use strict";

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var OrderAndShopSchema = new Schema({
  'order_id': {type: Number},
  'goods_id': {type: Number},
  'count': {type: Number},
  'size': {type: String},
  'price': {type: String},
  'discount_id': {type: String}
});

OrderAndShopSchema.methods = {
 /**
  * Schema Methods
  *
  * @param {String}
  *
  * @return {Boolean}
  * @api public
  */
}

mongoose.model('OrderAndShop', OrderAndShopSchema)
