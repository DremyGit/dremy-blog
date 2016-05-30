import { Schema, arrayOf } from 'normalizr';


const blogSchema = new Schema('blogs', { idAttribute: 'code' });
const tagSchema = new Schema('tags',  { idAttribute: 'code' });
const categorySchema = new Schema('categories',  { idAttribute: 'code' });

blogSchema.define({
  category: categorySchema,
  tags: arrayOf(tagSchema)
});

export { blogSchema, tagSchema, categorySchema }
