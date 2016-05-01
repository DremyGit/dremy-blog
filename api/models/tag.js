const Schema = require('mongoose').Schema;
const ObjectId = Schema.Types.ObjectId;

const TagSchema = new Schema({
  name: { type: String },
  blogs: [{type: ObjectId, ref: 'Blog'}]
});

module.exports = TagSchema;