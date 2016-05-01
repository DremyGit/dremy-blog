var mongoose = require('mongoose');

exports.Admin   = mongoose.model('Admin', require('./admin'));
exports.Archive = mongoose.model('Archive', require('./archive'));
exports.Blog    = mongoose.model('Blog', require('./blog'));
exports.Comment = mongoose.model('Comment', require('./comment'));
exports.Message = mongoose.model('Message', require('./message'));
exports.Tag     = mongoose.model('Tag', require('./tag'));
exports.Work    = mongoose.model('Work', require('./work'));