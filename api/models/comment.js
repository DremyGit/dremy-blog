const Schema = require('mongoose').Schema;
const ObjectId = Schema.Types.ObjectId;
const cache = require('../common/cache');

const CommentSchema = new Schema({
  user:     { type: String },
  blog:     { type: ObjectId, ref: 'Blog' },
  create_at:{ type: Date, default: Date.now },
  email:    { type: String },
  url:    { type: String },
  content:  { type: String },
  support_count: { type: Number, default: 0 },
  root_id: { type: ObjectId, ref: 'Comment' },
  reply_to: {
    _id:    { type: ObjectId },
    user:   { type: String },
    content:{ type: String },
    url:    { type: String }
  },
  replies: [{ type: ObjectId, ref: 'Comment'}],
  receive_email: { type: Boolean, default: false},
  __v: { type: Number, select: false }
});

CommentSchema.statics = {
  createComment: function (comment) {
    cache.delMulti('comments:*');
    return comment.save();
  },

  createMessage: function (message) {
    cache.delMulti('messages:*');
    return message.save();
  },

  getAllComments: function () {
    return cache.getSet('comments:all:list', () => {
      return this.find({blog: {$ne: null}}).populate('blog', {title: 1, code: 1}).exec();
    });
  },

  getAllMessages: function () {
    return cache.getSet('messages:all:list', () => {
      return this.find({blog: null}).exec();
    });
  },

  getCommentById: function (id, disableCache) {
    return cache.getSet(`comments:${id}`, () => {
      return this.findById(id).exec();
    }, disableCache);
  },

  getCommentNestedByBlogId: function (blogId) {
    return cache.getSet(`comments:blogs:${blogId}:nested`, () => {
      return this.find({blog: blogId, reply_to: null}, {email: 0, receive_email: 0}).populate('replies', {email: 0, receive_email: 0}).exec();
    });
  },

  getMessagesNested: function () {
    return cache.getSet('messages:all:nested', () => {
      return this.find({blog: null, reply_to: null}, {email: 0, receive_email: 0}).populate('replies', {email: 0, receive_email: 0}).exec();
    });
  },

  updateSupportCount: function (commentId, num) {
    cache.delMulti('comments:*');
    cache.delMulti('messages:*');
    return this.update({_id: commentId}, {$inc: {support_count: num}}).exec();
  },

  updateRootComment: function (rootId, commentId) {
    cache.delMulti('comments:*');
    cache.delMulti('messages:*');
    return this.update({_id: rootId}, {$push: {replies: commentId}}).exec();
  },

  removeRootComment: function (rootId, commentId) {
    cache.delMulti('comments:*');
    cache.delMulti('messages:*');
    return this.update({_id: rootId}, {$pull: {replies: commentId}}).exec();
  },

  removeCommentById: function (id) {
    cache.delMulti('comments:*');
    return this.remove({_id: id}).exec();
  },

  removeMessageById: function (id) {
    cache.delMulti('messages:*');
    return this.remove({_id: id}).exec();
  }
};

module.exports = CommentSchema;