const Schema = require('mongoose').Schema;

const TagSchema = new Schema({
  code: { type: String },
  name: { type: String },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now }
});

TagSchema.pre('save', function (next) {
  this.update_at = Date.now;
  next();
});

TagSchema.statics = {
  getAllTags: function () {
    return this.find({}).exec();
  },

  getTagById: function (id) {
    return this.findById(id).exec();
  },

  getTagByCode: function (name) {
    return this.findOne({name: name}).exec();
  }
};

module.exports = TagSchema;