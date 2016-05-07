const Schema = require('mongoose').Schema;
const ObjectId = Schema.Types.ObjectId;
const markdown = require('../common/markdown');
const toc = require('../common/toc');

const BlogSchema = new Schema({
  name: { type: String },
  title: { type: String },
  tag: { type: ObjectId, ref: 'Tag' },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  markdown: { type: String },
  html: { type: String },
  toc: { type: Array },
  comments: [ {type: ObjectId, ref: 'Comment'} ],
  click_count: { type: Number, default: 0 }
});

BlogSchema.pre('save', function(next) {
  this.html = markdown(this.markdown);
  this.toc = toc(this.markdown);
  this.update_at = Date.now;
  next();
});

BlogSchema.statics = {
  getAllBlogs: function() {
    return this.find({}).exec();
  },

  getBlogById: function (id) {
    return this.findById(id).exec();
  },

  getBlogByName: function (name) {
    return this.findOne({name: name}).exec();
  },

  getBlogsByQuery: function (query) {
    return this.find.apply(this, query).exec();
  },
  
  addComment: function (blogId, commentId) {
    return this.update({_id: blogId}, {$push: {comments: commentId}}).exec();
  },

  removeById: function(id) {
    return this.remove({_id: id}).exec();
  },

  removeCommentByCommentId: function (commentId) {
    return this.update({}, {$pull: {comments: commentId}}).exec();
  }
};

BlogSchema.index({name: 1}, {unique: true});

module.exports = BlogSchema;

