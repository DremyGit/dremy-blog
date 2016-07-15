const Schema = require('mongoose').Schema;
const ObjectId = Schema.Types.ObjectId;
const markdown = require('../common/markdown');
const toc = require('../common/toc');
const cache = require('../common/cache');

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
  click_count: { type: Number, default: 0 },
  __v: { type: Number, select: false }
});

BlogSchema.pre('save', function(next) {
  this.html.summary = markdown(this.markdown.summary);
  this.html.body = markdown(this.markdown.body);
  this.toc = toc(this.markdown.body);
  this.update_at = Date.now;
  next();
});

BlogSchema.statics = {
  getBlogsByQuery: function (query, opt) {
    return cache.getSet(`blogs:list:${JSON.stringify(query)}:${JSON.stringify(opt)}`, () => {
      return this.find(query, {}, opt).populate(['category', 'tags']).exec();
    });
  },
  getBlogById: function (id, disableCache) {
    return cache.getSet(`blogs:id:${id}`, () => {
      return this.findById(id).exec();
    }, disableCache);
  },

  createBlog: function (blog) {
    cache.delMulti(`blogs:list:*`);
    return blog.save();
  },

  updateBlog: function (blog) {
    cache.del(`blogs:id:${blog._id}`);
    cache.delMulti(`blogs:list:*`);
    return blog.save();
  },

  increaseBlogCommentCount: function (blogId, num) {
    cache.del(`blogs:id:${blogId}`);
    return this.update({_id: blogId}, {$inc: {comment_count: num}}).exec();
  },

  removeById: function(id) {
    cache.del(`blogs:id:${id}`);
    cache.delMulti(`blogs:list:*`);
    return this.remove({_id: id}).exec();
  },

  removeCategoryInBlog: function (categoryId) {
    cache.delMulti('blogs:*');
    return this.update({category: categoryId}, {$unset: {category: 1}}, {multi: 1})
  },

  removeTagInBlog: function (tagId) {
    cache.delMulti('blogs:*');
    return this.update({tags: tagId}, {$pull: {tags: tagId}}, {multi: 1});
  },

  getBlogArchives: function () {
    return cache.getSet('archive:list', () => {
      return this.aggregate([
        { "$project": { "year": { "$year": "$create_at" }, "blog": {"code": "$code", "title": "$title", "create_at": "$create_at"}}},
        { "$sort": { "blog.create_at": -1}},
        { "$group": { "_id": { "year": "$year" }, "blogs": { "$push": "$blog" } }},
        { "$project": { "_id": 0, "year": "$_id.year", "blogs": "$blogs" }}
      ]).exec();
    });
  }
};

BlogSchema.index({code: 1}, {unique: 1});
BlogSchema.index({category: 1});
BlogSchema.index({tags: 1});
BlogSchema.index({created_at: -1});

module.exports = BlogSchema;

