const Schema = require('mongoose').Schema;
const ObjectId = Schema.Types.ObjectId;

const CommentSchema = new Schema({
  user: { type: String },
  target: { type: ObjectId, ref: 'Comment' },
  email: { type: String },
  content: { type: String }
});

module.exports = CommentSchema;