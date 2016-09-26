const Schema = require('mongoose').Schema;
const pangu = require('pangu');
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
  this.markdown.summary = pangu.spacing(this.markdown.summary);
  this.markdown.body = pangu.spacing(this.markdown.body);
  this.title = pangu.spacing(this.title);
  this.html.summary = markdown(this.markdown.summary);
  this.html.body = markdown(this.markdown.body);
  this.toc = toc(this.markdown.body);
  this.update_at = Date.now;
  next();
});

BlogSchema.statics = {
  getBlogsByQuery: function (query, opt) {
    opt = opt || {};
    opt.sort = Object.assign({'create_at': -1}, opt.sort);
    return cache.getSet(`blogs:list:${JSON.stringify(query)}:${JSON.stringify(opt)}`, () => {
      return this.find(query, {'markdown': 0, 'html.body': 0, 'toc': 0}, opt).populate(['category', 'tags']).exec();
    });
  },
  getBlogById: function (id, disableCache) {
    return cache.getSet(`blogs:id:${id}`, () => {
      return this.findById(id, {'markdown': 0}).populate(['category', 'tags']).exec();
    }, disableCache);
  },
  getBlogByIdAdmin: function (id, disableCache) {
    return cache.getSet(`blogs:id:${id}:admin`, () => {
      return this.findById(id).exec();
    })
  },

  createBlog: function (blog) {
    cache.delMulti(`blogs:list:*`);
    return blog.save();
  },

  updateBlog: function (blog) {
    cache.delMulti(`blogs:id:${blog._id}*`);
    cache.delMulti(`blogs:list:*`);
    return blog.save();
  },

  increaseBlogCommentCount: function (blogId, num) {
    cache.del(`blogs:id:${blogId}`);
    return this.update({_id: blogId}, {$inc: {comment_count: num}}).exec();
  },

  removeById: function(id) {
    cache.delMulti(`blogs:id:${id}*`);
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
BlogSchema.index({create_at: -1});

module.exports = BlogSchema;

