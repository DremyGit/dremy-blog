const Schema = require('mongoose').Schema;
const ObjectId = Schema.Types.ObjectId;

const MessageSchema = new Schema({
  user: { type: String },
  target: { type: ObjectId, ref: 'Message' },
  email: { type: String },
  content: { type: String }
});

module.exports = MessageSchema;