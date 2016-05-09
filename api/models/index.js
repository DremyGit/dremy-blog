var mongoose = require('mongoose');
var config = require('../config');

const env = process.env.NODE_ENV || 'development';

if (env == 'test') {
  mongoose.connect('mongodb://localhost/test_dremy_blog');
} else {
  mongoose.connect(config.mongodb);
}

exports.Admin   = mongoose.model('Admin', require('./admin'));
exports.Blog    = mongoose.model('Blog', require('./blog'));
exports.Category= mongoose.model('Category', require('./category'));
exports.Comment = mongoose.model('Comment', require('./comment'));
exports.Message = mongoose.model('Message', require('./message'));
exports.Tag     = mongoose.model('Tag', require('./tag'));
exports.Work    = mongoose.model('Work', require('./work'));