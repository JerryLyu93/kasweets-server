'use strict';

/**
 * Module dependencies.
 */

const crypto = require('crypto');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const validatePresenceOf = value => value && value.length;

/**
 * User Schema
 */

var UserSchema = new Schema({
  telephone: {type: String, require: true},
  hashed_password: {type: String, require: true},
  salt: { type: String, default: '' },
  name: { type: String, default: ''},
  order: {type: Array, default: []},
  address: {type: Array, default: []},
  current_address: Number,
  rank: {type: String, default: '1'},
  total_credit: {type: Number, default: 0},
  usable_credit: {type: Number, default: 0},
  updated: { type: Date, default: new Date().toLocaleString() },
  birthday: { type: Date }
});


/**
 * Virtuals
 */

UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

/**
 * Methods
 */

UserSchema.methods = {

  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */

  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */

  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */

  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  }
};

/**
 * Pre-save hook
 */

UserSchema.pre('save', function (next) {
  if (!this.isNew) return next();

  if (!validatePresenceOf(this.password)) {
    next(new Error('Invalid password'));
  } else {
    next();
  }
});

mongoose.model('User', UserSchema)
