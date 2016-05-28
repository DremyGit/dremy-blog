const Schema = require('mongoose').Schema;
const cache = require('../common/cache');

const TagSchema = new Schema({
  code: { type: String },
  name: { type: String },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  __v: { type: Number, select: false }
});

TagSchema.pre('save', function (next) {
  this.update_at = Date.now;
  next();
});

TagSchema.statics = {
  getAllTags: function () {
    return cache.getSet('blogs:tags:all', () => {
      return this.find({}).exec();
    });
  },

  getTagById: function (id, disableCache) {
    return cache.getSet(`blogs:tags:${id}`, () => {
      return this.findById(id).exec();
    }, disableCache);
  },

  removeTagById: function (id) {
    cache.delMulti('blogs:tags:*');
    return this.remove({_id: id}).exec();
  },

  getTagsWithBlogCount: function () {
    return cache.getSet(`blogs:tags:all:count`, () => {
      return this.aggregate([
        { "$lookup": { "from": "blogs", "localField": "_id", "foreignField": "tags", "as": "blogs" }},
        { "$project": { "code": 1, "name": 1, "count": { "$size": "$blogs" }}}
      ]).exec();
    });
  }
};

TagSchema.index({code: 1}, {unique: 1});

module.exports = TagSchema;