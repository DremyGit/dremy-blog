const Schema = require('mongoose').Schema;
const ObjectId = Schema.Types.ObjectId;

const BlogSchema = new Schema({
  name: { type: String },
  title: { type: String },
  tag: { type: ObjectId, ref: 'Tag' },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  markdown: { type: String },
  html: { type: String },
  toc: [{ type: Object }],
  comments: [ {type: ObjectId, ref: 'Comment'} ],
  click_count: { type: Number }
});

BlogSchema.statics = {
  getAllBlogs: function() {
    return this.find({}).exec();
  },

  getBlogById: function (id) {
    return this.findById(id).exec();
  },

  getBlogByName: function (name) {
    return this.findOne({name: name}).exec();
  },
  
  addComment: function (blogId, commentId) {
    return this.update({_id: blogId}, {$push: {comments: commentId}}).exec();
  },

  removeById: function(id) {
    return this.remove({_id: id}).exec();
  },

  removeCommentByCommentId: function (commentId) {
    return this.update({}, {$pull: {comments: commentId}}).exec();
  }
};

BlogSchema.index({name: 1}, {unique: true});

module.exports = BlogSchema;

