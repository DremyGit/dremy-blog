import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

const TagPage = () => {
  return (
    <div>
      <Helmet
        title='博客标签 Dremy_博客'
        meta={[
            { "name": "description", "content": "Dremy_博客 博客标签" }
          ]}
      />
      <h1>Tag List!</h1>
    </div>
  )
};
export default TagPage;
