import { Schema, arrayOf } from 'normalizr';


const blogSchema = new Schema('blog', { idAttribute: 'code' });
const tagSchema = new Schema('tag',  { idAttribute: 'code' });
const categorySchema = new Schema('category',  { idAttribute: 'code' });

blogSchema.define({
  category: categorySchema,
  tags: arrayOf(tagSchema)
});

export { blogSchema, tagSchema, categorySchema }
