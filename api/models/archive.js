const Schema = require('mongoose').Schema;
const ObjectId = Schema.Types.ObjectId;

const ArchiveSchema = new Schema({
  year: { type: Number },
  month: { type: Number },
  blogs: [{ type: ObjectId, ref: 'Blog'}]
});

module.exports = ArchiveSchema;