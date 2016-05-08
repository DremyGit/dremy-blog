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

  getCategoryByCode: function (name) {
    return this.findOne({name: name}).exec();
  }
};


module.exports = CategorySchema;
