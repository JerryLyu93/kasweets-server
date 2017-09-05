/**
 * Module dependencies.
 */

import * as crypto from 'crypto'
import {Schema, model, Document} from 'mongoose'

const validatePresenceOf: (value: string) => number = value => value && value.length;

/**
 * User Schema
 */

var UserSchema: Schema = new Schema({
  telephone: {type: String, require: true},
  auth: {type: Object},
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

  authenticate: function (plainText: string): boolean {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */

  makeSalt: function (): string {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */

  encryptPassword: function (password: string):string {
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

model('User', UserSchema)
