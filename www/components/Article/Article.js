import React from 'react';
import { Link } from 'react-router';

const Article = (props) => {
  return (
    <div dangerouslySetInnerHTML={{__html: props.html}}></div>
  )
};

Article.PropTypes = {
  html: React.PropTypes.string.isRequired
};

export default Article;
