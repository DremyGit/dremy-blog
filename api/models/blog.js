const Schema = require('mongoose').Schema;
const ObjectId = Schema.Types.ObjectId;
const markdown = require('../common/markdown');
const toc = require('../common/toc');

const BlogSchema = new Schema({
  code: { type: String },
  title: { type: String },
  category: { type: ObjectId, ref: 'Category' },
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

  getBlogsByQuery: function (query) {
    return this.find.apply(this, query).exec();
  },

  getBlogsCountByQuery: function (query) {
    return this.find(query).count().exec();
  },

  addComment: function (blogId, commentId) {
    return this.update({_id: blogId}, {$push: {comments: commentId}}).exec();
  },

  removeById: function(id) {
    return this.remove({_id: id}).exec();
  },

  removeCommentByCommentId: function (commentId) {
    return this.update({}, {$pull: {comments: commentId}}).exec();
  },

  getBlogArchives: function () {
    return this.aggregate([
      { "$project": { "year": { "$year": "$create_at" }, "month": { "$month": "$create_at" }}},
      { "$group": { "_id": { "year": "$year", "month": "$month" }, "count": { "$sum": 1 }}},
      { "$project": { "_id": 0, "year": "$_id.year", "month": "$_id.month", "count": 1 }},
      { "$sort": { "year": -1, "month": -1 }}
    ]).exec();
  }
};

BlogSchema.index({code: 1});

module.exports = BlogSchema;

