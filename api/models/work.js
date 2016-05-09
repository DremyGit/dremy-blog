const Schema = require('mongoose').Schema;
const ObjectId = Schema.Types.ObjectId;

const WorkSchema = new Schema({
  code: { type: String },
  introduction: {type: String },
  url: { type: String },
  picUrl: { type: String },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now }
});

WorkSchema.pre('save', function (next) {
  this.update_at = Date.now;
  next();
});


WorkSchema.statics = {
  getAllWorks: function () {
    return this.find({}).exec();
  },

  getWorkById: function (id) {
    return this.findById(id).exec();
  },

  removeWorkById: function (id) {
    return this.remove({_id: id}).exec();
  }
};

WorkSchema.index({code: 1}, {unique: 1});

module.exports = WorkSchema;