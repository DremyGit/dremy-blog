const Schema = require('mongoose').Schema;
const ObjectId = Schema.Types.ObjectId;

const WorkSchema = new Schema({
  date: { type: Date, default: Date.now },
  name: { type: String },
  introduction: {type: String },
  url: { type: String },
  picUrl: { type: String }
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

module.exports = WorkSchema;