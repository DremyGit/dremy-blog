import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

const AboutPage = () => {
  return (
    <div>
      <Helmet
        title='关于 Dremy_博客'
        meta={[
            { "name": "description", "content": "Dremy_博客 关于" }
          ]}
      />
      <h1>About</h1>
    </div>
  )
};
export default AboutPage;
