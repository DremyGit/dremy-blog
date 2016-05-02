const Schema = require('mongoose').Schema;
const ObjectId = Schema.Types.ObjectId;

const BlogSchema = new Schema({
  name: { type: String },
  title: { type: String },
  tag: { type: ObjectId },
  create_at: { type: Date, default: Date.now},
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

  removeById: function(id) {
    return this.remove({_id: id}).exec();
  }
};

module.exports = BlogSchema;

