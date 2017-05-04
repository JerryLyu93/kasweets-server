"use strict";

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var DiscountSchema = new Schema({
  name: {type: String},
  rule: {type: String},
  description: {type: String}
});

DiscountSchema.methods = {
 /**
  * Schema Methods
  *
  * @param {String}
  *
  * @return {Boolean}
  * @api public
  */
}

mongoose.model('Discount', DiscountSchema)
