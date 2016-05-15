import React from 'react';
import { Link } from 'react-router';

const Article = (props) => {
  const styles = require('./Article.scss');
  return (
    <div className={styles.article} dangerouslySetInnerHTML={{__html: props.html}}></div>
  )
};

Article.PropTypes = {
  html: React.PropTypes.string.isRequired
};

export default Article;
