import React from 'react';
import { Link } from 'react-router';
import ArticleBody from '../Article/ArticleBody';
import CSSModules from 'react-css-modules';
import styles from './ArticleHead.scss';
import { timeFormat } from '../../utils/time.js'


class ArticleHead extends React.Component {
  render () {
    const { blog, category, center } = this.props;
    const _blog = blog.toJS();
    const _category = category.toJS();
    return (
      <div styleName={center ? 'center' : null}>
        <h1 styleName="title"><Link to={'/blog/' + _blog.code}>{_blog.title}</Link></h1>
        <div styleName="info">
          <i className="fa fa-book" aria-hidden="true" />
          {' '}
          <Link to={'/' + _category.code}>
            {_category.name}
          </Link>
          {' | '}
          <i className="fa fa-calendar" aria-hidden="true" />
          {' '} {timeFormat(new Date(_blog.create_at))} {' | '}
          <i className="fa fa-commenting" aria-hidden="true" />
          {' '} {_blog.comment_count}
        </div>
      </div>
    )
  }
}

ArticleHead.propTypes = {
  blog: React.PropTypes.object.isRequired,
  category: React.PropTypes.object.isRequired,
  center: React.PropTypes.bool
};
export default CSSModules(ArticleHead, styles);
