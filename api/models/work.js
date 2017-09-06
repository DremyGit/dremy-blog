const Schema = require('mongoose').Schema;
const ObjectId = Schema.Types.ObjectId;
const cache = require('../common/cache');

const WorkSchema = new Schema({
  code: { type: String },
  introduction: {type: String },
  url: { type: String },
  picUrl: { type: String },
  create_at: { type: Date, default: Date.now() },
  update_at: { type: Date, default: Date.now() },
  __v: { type: Number, select: false }
});

WorkSchema.pre('save', function (next) {
  this.update_at = Date.now();
  next();
});


WorkSchema.statics = {
  createWork: function (work) {
    cache.del('works:all');
    return work.save();
  },

  getAllWorks: function () {
    return cache.getSet('works:all', () => {
      return this.find({}).exec();
    })
  },

  getWorkById: function (id, disableCache) {
    return cache.getSet(`works:${id}`, () => {
      return this.findById(id).exec();
    }, disableCache);
  },

  updateWork: function (work) {
    cache.del('works:all');
    cache.del(`works:${work._id}`);
    return work.save();
  },

  removeWorkById: function (id) {
    cache.del('works:all');
    cache.del(`works:${id}`);
    return this.remove({_id: id}).exec();
  }
};

WorkSchema.index({code: 1}, {unique: 1});

module.exports = WorkSchema;