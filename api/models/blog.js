const Schema = require('mongoose').Schema;
const ObjectId = Schema.Types.ObjectId;

const Schema = new Schema({
  name: { type: String },
  title: { type: String },
  tag: { type: ObjectId },
  create_at: { type: Date, default: Date.now},
  markdown: { type: String },
  html: { type: String },
  toc: { type: Object },
  comments: [ {type: ObjectId, ref: 'Comment'} ],
  click_count: { type: Number }
});

module.exports = Schema;

