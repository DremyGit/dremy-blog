const Schema = require('mongoose').Schema;
const ObjectId = Schema.Types.ObjectId;

const WorkSchema = new Schema({
  date: { type: Date, default: Date.now },
  name: { type: String },
  introduction: {type: String },
  url: { type: String },
  picUrl: { type: String }
});

module.exports = WorkSchema;