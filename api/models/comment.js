const Schema = require('mongoose').Schema;
const ObjectId = Schema.Types.ObjectId;
const cache = require('../common/cache');

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
  replies: [{ type: ObjectId, ref: 'Comment'}],
  __v: { type: Number, select: false }
});

CommentSchema.statics = {
  getAllComments: function () {
    return cache.getSet('blogs:comments:list', () => {
      return this.find({blog: {$ne: null}}).exec();
    });
  },

  getAllMessages: function () {
    return cache.getSet('messages:all:list', () => {
      return this.find({blog: null}).exec();
    });
  },

  getCommentById: function (id, disableCache) {
    return cache.getSet(`blogs:comments:${id}`, () => {
      return this.findById(id).exec();
    }, disableCache);
  },

  getCommentNestedByBlogId: function (blogId) {
    return cache.getSet(`blogs:${blogId}:nested`, () => {
      return this.find({blog: blogId, reply_to: null}).populate('replies').exec();
    });
  },

  getMessagesNested: function () {
    return cache.getSet('messages:all:nested', () => {
      return this.find({blog: null, reply_to: null}).populate('replies').exec();
    });
  },

  updateSupportCount: function (commentId, num) {
    cache.delMulti('blogs:*');
    return this.update({_id: commentId}, {$inc: {support_count: num}}).exec();
  },

  updateRootComment: function (rootId, commentId) {
    cache.delMulti('blogs:*');
    return this.update({_id: rootId}, {$push: {replies: commentId}}).exec();
  },

  removeRootComment: function (rootId, commentId) {
    cache.delMulti('blogs:*');
    return this.update({_id: rootId}, {$pull: {replies: commentId}}).exec();
  },

  removeCommentById: function (id) {
    cache.delMulti('blogs:*');
    return this.remove({_id: id}).exec();
  }
};

module.exports = CommentSchema;