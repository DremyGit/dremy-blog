import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import ArticleBody from '../components/Article/ArticleBody';

const html = require('../about.html').toString();
const description = html.replace(/<.*?>|\r?\n/g, ' ').replace(/  +/g, ' ').substr(0, 100);

const AboutPage = () => {
  return (
    <div>
      <Helmet
        title='关于 Dremy_博客'
        meta={[
            { "name": "description", "content": description }
          ]}
      />
      <ArticleBody html={html} />
    </div>
  )
};
export default AboutPage;
