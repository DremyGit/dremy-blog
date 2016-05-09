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

  removeTagById: function (id) {
    return this.remove({_id: id}).exec();
  },

  getTagsWithBlogCount: function () {
    return this.aggregate([
      { "$lookup": { "from": "blogs", "localField": "_id", "foreignField": "tags", "as": "blogs" }},
      { "$project": { "code": 1, "name": 1, "count": { "$size": "$blogs" }}}
    ]).exec();
  }
};

TagSchema.index({code: 1}, {unique: 1});

module.exports = TagSchema;