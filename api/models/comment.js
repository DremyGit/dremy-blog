const Schema = require('mongoose').Schema;
const ObjectId = Schema.Types.ObjectId;

const CommentSchema = new Schema({
  user:     { type: String },
  blog:     { type: ObjectId, ref: 'Blog' },
  target:   { type: ObjectId, ref: 'Comment' },
  email:    { type: String },
  content:  { type: String }
});

CommentSchema.statics = {
  getAllComments: function () {
    return this.find({}).exec();
  },

  getCommentById: function (id) {
    return this.findById(id).exec();
  },

  deleteCommentById: function (id) {
    return this.remove({_id: id}).exec();
  }
};

module.exports = CommentSchema;