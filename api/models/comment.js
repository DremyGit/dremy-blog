const Schema = require('mongoose').Schema;
const ObjectId = Schema.Types.ObjectId;

const CommentSchema = new Schema({
  user:     { type: String },
  blog:     { type: ObjectId, ref: 'Blog' },
  create_at:{ type: Date, default: Date.now },
  email:    { type: String },
  content:  { type: String },
  support_count: { type: Number, default: 0 },
  root_id: { type: ObjectId, ref: 'Comment' },
  reply_to: {
    _id:    { type: ObjectId },
    user:   { type: String },
    content:{ type: String }
  },
  replies: [{ type: ObjectId, ref: 'Comment'}]
});

CommentSchema.statics = {
  getAllComments: function () {
    return this.find({}).exec();
  },

  getCommentById: function (id) {
    return this.findById(id).exec();
  },

  getCommentNestedByBlogId: function (blogId) {
    return this.find({blog: blogId, reply_to: null}).populate('replies').exec();
  },

  updateRootComment: function (rootId, commentId) {
    return this.update({_id: rootId}, {$push: {replies: commentId}}).exec();
  },

  removeRootComment: function (rootId, commentId) {
    return this.update({_id: rootId}, {$pull: {replies: commentId}}).exec();
  },

  removeCommentById: function (id) {
    return this.remove({_id: id}).exec();
  }
};

module.exports = CommentSchema;