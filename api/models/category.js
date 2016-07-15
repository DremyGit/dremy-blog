const Schema = require('mongoose').Schema;
const cache = require('../common/cache');

const CategorySchema = new Schema({
  code: { type: String },
  name: { type: String },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  __v: { type: Number, select: false }
});

CategorySchema.pre('save', function (next) {
  this.update_at = Date.now;
  next();
});

CategorySchema.statics = {

  createCategory: function (category) {
    cache.del('categories:all');
    return category.save();
  },

  getCategoryById: function (id, disableCache) {
    return cache.getSet(`categories:${id}`, () => {
      return this.findById(id).exec();
    }, disableCache);
  },

  updateCategory: function (category) {
    cache.del(`categories:${category._id}`);
    cache.del('categories:all');
    return category.save();
  },

  removeCategoryById: function (id) {
    cache.del(`categories:${id}`);
    cache.del('categories:all');
    return this.remove({_id: id}).exec();
  },

  getCategoriesWithBlogCount: function () {
    return cache.getSet('categories:all', () => {
      return this.aggregate([
        { "$lookup": { "from": "blogs", "localField": "_id", "foreignField": "category", "as": "blogs" }},
        { "$project": { "code": 1, "name": 1, "count": { "$size": "$blogs" } }}
      ]).exec()
    })
  }
};

CategorySchema.index({code: 1}, {unique: 1});

module.exports = CategorySchema;
