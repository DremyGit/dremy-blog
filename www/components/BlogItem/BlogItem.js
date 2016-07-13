import React from 'react';
import { Link } from 'react-router';
import ArticleBody from '../Article/ArticleBody';
import CSSModules from 'react-css-modules';
import styles from './BlogItem.scss';
import { timeFormat } from '../../utils/time.js'


class BlogItem extends React.Component {
  render () {
    const { blog, category } = this.props;
    const _blog = blog.toJS();
    return (
      <div styleName="blogItem">
        <h1 styleName="title"><Link to={'/blog/' + _blog.code}>{_blog.title}</Link></h1>
        <div styleName="info">
          <i className="fa fa-book" aria-hidden="true" />
          {' '}
          <Link to={'/' + category.code}>
            {category.name}
          </Link>
          {' | '}
          <i className="fa fa-calendar" aria-hidden="true" />
          {' '} {timeFormat(new Date(_blog.create_at))} {' | '}
          <i className="fa fa-commenting" aria-hidden="true" />
          {' '} {_blog.comment_count}
        </div>
        <div>
          <ArticleBody html={_blog.html.summary} />
        </div>
        <div>
          <Link to={'/blog/' + _blog.code}>阅读全文</Link>
        </div>
      </div>
    )
  }
}

BlogItem.propTypes = {
  blog: React.PropTypes.object.isRequired,
  category: React.PropTypes.object.isRequired
};
export default CSSModules(BlogItem, styles);