import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

const ArchivePage = () => {
  return (
    <div>
      <Helmet
        title='作品展示 Dremy_博客'
        meta={[
            { "name": "description", "content": "Dremy_博客 作品展示" }
          ]}
      />
      <h1>Archive</h1>
    </div>
  )
};
export default ArchivePage;
