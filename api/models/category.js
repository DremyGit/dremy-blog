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
  getAllCategories: function () {
    return this.find({}).exec();
  },

  getCategoryById: function (id) {
    return this.findById(id).exec();
  },

  removeCategoryById: function (id) {
    return this.remove({_id: id}).exec();
  }
};


module.exports = CategorySchema;
