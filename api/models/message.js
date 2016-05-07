const Schema = require('mongoose').Schema;
const ObjectId = Schema.Types.ObjectId;

const MessageSchema = new Schema({
  user: { type: String },
  target: { type: ObjectId, ref: 'Message' },
  create_at: { type: Date, default: Date.now },
  email: { type: String },
  content: { type: String }
});

MessageSchema.statics = {
  getAllMessages: function () {
    return this.find({}).exec();
  },

  removeMessageById: function (id) {
    return this.remove({_id: id}).exec();
  }
};

module.exports = MessageSchema;