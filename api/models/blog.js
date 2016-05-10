const Schema = require('mongoose').Schema;
const ObjectId = Schema.Types.ObjectId;
const markdown = require('../common/markdown');
const toc = require('../common/toc');

const BlogSchema = new Schema({
  code: { type: String },
  title: { type: String },
  category: { type: ObjectId, ref: 'Category' },
  tags: [{ type: ObjectId, ref: 'Tag' }],
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  markdown: {
    summary: { type: String, default: '' },
    body: { type: String, default: '' }
  },
  html: {
    summary: { type: String },
    body: { type: String }
  },
  toc: { type: Array },
  comment_count: { type: Number, default: 0},
  click_count: { type: Number, default: 0 }
});

BlogSchema.pre('save', function(next) {
  this.html.summary = markdown(this.markdown.summary);
  this.html.body = markdown(this.markdown.body);
  this.toc = toc(this.markdown.body);
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

  addBlogCommentCount: function (blogId) {
    return this.update({_id: blogId}, {$inc: {comment_count: 1}}).exec();
  },

  decreaseBlogCommentCount: function (blogId) {
    return this.update({_id: blogId}, {$inc: {comment_count: -1}})
  },

  removeById: function(id) {
    return this.remove({_id: id}).exec();
  },

  removeCategoryInBlog: function (categoryId) {
    return this.update({category: categoryId}, {$unset: {category: 1}}, {multi: 1})
  },

  removeTagInBlog: function (tagId) {
    return this.update({tags: tagId}, {$pull: {tags: tagId}}, {multi: 1});
  },

  getBlogArchives: function () {
    return this.aggregate([
      { "$project": { "year": { "$year": "$create_at" }, "blog": {"code": "$code", "title": "$title", "create_at": "$create_at"}}},
      { "$sort": { "blog.create_at": -1}},
      { "$group": { "_id": { "year": "$year", }, "blogs": { "$push": "$blog" } }},
      { "$project": { "_id": 0, "year": "$_id.year", "blogs": "$blogs" }}
    ]).exec();
  }
};

BlogSchema.index({code: 1}, {unique: 1});
BlogSchema.index({category: 1});
BlogSchema.index({tags: 1});
BlogSchema.index({created_at: -1});

module.exports = BlogSchema;

