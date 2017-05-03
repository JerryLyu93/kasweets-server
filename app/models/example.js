"use strict";

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var ExampleSchema = new Schema({});

ExampleSchema.methods = {
 /**
  * Schema Methods
  *
  * @param {String}
  *
  * @return {Boolean}
  * @api public
  */
}

mongoose.model('Example', ExampleSchema)
