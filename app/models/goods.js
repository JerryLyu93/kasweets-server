"use strict";

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var GoodsSchema = new Schema({
  name: {type: String},
  size: {type: Array},
  price: {type: Number},
  stock: {type: Number, default: false},
  is_sale: {type: Boolean, default: false},
  summary: {type: String},
  description: {type: String},
  taste: {type: String},
  material: {type: String},
  images: {type: Array},
  is_point: {type: Boolean, default: false},
  alert: {type: String, default: ''}
});

GoodsSchema.methods = {
 /**
  * Schema Methods
  *
  * @param {String}
  *
  * @return {Boolean}
  * @api public
  */
}

mongoose.model('Goods', GoodsSchema)
