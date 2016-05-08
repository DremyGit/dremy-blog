const Schema = require('mongoose').Schema;
const crypto = require('crypto');
const utils = require('../common/utils');

const AdminSchema = new Schema({
  username: { type: String },
  password: { type: String }
});

AdminSchema.pre('save', function(next) {
  this.password = utils.md5(this.password);
  next();
});

AdminSchema.statics = {
  isAdmin: function (username, password) {
    return this.find({username: username, password: utils.md5(password)}).count().exec();
  }
};

module.exports = AdminSchema;