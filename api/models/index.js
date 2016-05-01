var mongoose = require('mongoose');

require('./admin');
require('./archive');
require('./blog');
require('./comment');
require('./message');
require('./tag');
require('./work');

exports.Admin   = mongoose.model('Admin');
exports.Archive = mongoose.model('Archive');
exports.Blog    = mongoose.model('Blog');
exports.Comment = mongoose.model('Comment');
exports.Message = mongoose.model('Message');
exports.Tag     = mongoose.model('Tag');
exports.Work    = mongoose.model('Work');