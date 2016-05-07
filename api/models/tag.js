const Schema = require('mongoose').Schema;
const ObjectId = Schema.Types.ObjectId;

const TagSchema = new Schema({
  name: { type: String },
  blogs: [{type: ObjectId, ref: 'Blog'}],
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now }
});

TagSchema.pre('save', function (next) {
  this.update_at = Date.now;
  next();
});

TagSchema.statics = {
  getAllTags: function () {
    return this.find({}).exec();
  },

  getTagById: function (id) {
    return this.findById(id).exec();
  },

  addBlogId: function (tagId, blogId) {
    return this.update({_id: tagId}, {$push: {blogs: blogId}}).exec();
  },

  removeBlogId: function (tagId, blogId) {
    return this.update({_id: tagId}, {$pull: {blogs: blogId}}).exec();
  },

  removeTagById: function (id) {
    return this.remove({_id: id}).exec();
  }


};

module.exports = TagSchema;