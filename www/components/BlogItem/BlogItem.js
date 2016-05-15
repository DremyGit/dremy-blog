import React from 'react';
import { Link } from 'react-router';
import Article from '../Article/Article';
import CSSModules from 'react-css-modules';
import styles from './BlogItem.scss';
import { timeFormat } from '../../utils/time.js'

const BlogItem = (props) => {
  const blog = props.blog;
  return (
    <div styleName="blogItem">
      <h1 styleName="title"><Link to={'/blog/' + blog.code}>{blog.title}</Link></h1>
      <div styleName="info">
        <i className="fa fa-book" aria-hidden="true" />
        {' '}
        <Link to={'/' + blog.category.code}>
          {blog.category.name}
        </Link>
        {' | '}
        <i className="fa fa-calendar" aria-hidden="true" />
        {' '} {timeFormat(new Date(blog.create_at))} {' | '}
        <i className="fa fa-commenting" aria-hidden="true" />
        {' '} {blog.comment_count}
      </div>
      <div>
        <Article html={blog.html.summary} />
      </div>
      <div>
        <Link to={'/blog/' + blog.code}>阅读全文</Link>
      </div>
    </div>
  )
};

BlogItem.propTypes = {
  blog: React.PropTypes.object.isRequired
};
export default CSSModules(BlogItem, styles);
