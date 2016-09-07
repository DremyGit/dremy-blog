import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

const CategoryPage = () => {
  return (
    <div>
      <Helmet
        title='博客分类 Dremy_博客'
        meta={[
            { "name": "description", "content": "Dremy_博客 博客分类" }
          ]}
      />
      <h1>CategoryPage</h1>
    </div>
  )
};
export default CategoryPage;
