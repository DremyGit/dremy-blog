import { Schema, arrayOf } from 'normalizr';


const blogSchema = new Schema('blog', { idAttribute: 'code' });
const tagSchema = new Schema('tag', { idAttribute: 'code' });
const categorySchema = new Schema('category', { idAttribute: 'code' });
const commentSchema = new Schema('comment', { idAttribute: '_id' });

blogSchema.define({
  category: categorySchema,
  tags: arrayOf(tagSchema),
});

commentSchema.define({
  replies: arrayOf(commentSchema),
});

export { blogSchema, tagSchema, categorySchema, commentSchema };
