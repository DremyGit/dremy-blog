const Schema = require('mongoose').Schema;

const CategorySchema = new Schema({
  code: { type: String },
  name: { type: String },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now }
});

CategorySchema.pre('save', function (next) {
  this.update_at = Date.now;
  next();
});

CategorySchema.statics = {
  getCategoryById: function (id) {
    return this.findById(id).exec();
  },

  removeCategoryById: function (id) {
    return this.remove({_id: id}).exec();
  },

  getCategoriesWithBlogCount: function () {
    return this.aggregate([
      { "$lookup": { "from": "blogs", "localField": "_id", "foreignField": "category", "as": "blogs" }},
      { "$project": { "code": 1, "name": 1, "count": { "$size": "$blogs" } }}
    ]).exec()
  }
};

CategorySchema.index({code: 1}, {unique: 1});

module.exports = CategorySchema;
