import React from 'react';
import { Link } from 'react-router';
import ArticleBody from '../Article/ArticleBody';
import CSSModules from 'react-css-modules';
import styles from './ArticleHead.scss';
import { timeFormat } from '../../utils/time.js'


class ArticleHead extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.blog !== this.props.blog
        || nextProps.category !== this.props.category
  }
  render () {
    const { blog, category, tags, center, link, marginTop, marginBottom } = this.props;
    const _blog = blog.toJS();
    const _category = category.toJS();
    return (
      <div className={styles.header} styleName={center ? 'center' : null} >
        <h1 styleName="title">
          { link ?
            <Link to={`/blog/${_blog.code}`}>{_blog.title}</Link> :
            _blog.title
          }
        </h1>
        <div styleName="info">
          <span styleName="col">
            <i className="fa fa-book" />
            <Link to={`/category/${_category.code}`} className="underline">
              {_category.name}
            </Link>
          </span>
          <span styleName="col">
            <i className="fa fa-calendar" />
            {timeFormat(new Date(_blog.create_at))}
          </span>
          <span styleName="col">
            <i className="fa fa-commenting" />
            {_blog.comment_count} 篇评论
          </span>
          <span styleName="col">
            <i className="fa fa-tags" />
            {tags.valueSeq().map(tag =>
              <span key={tag.get('code')} styleName="tag">{' '}<Link styleName="tag" className="underline" to={`/tag/${tag.get('code')}`}>{tag.get('name')}</Link></span>
            ).toArray()}
          </span>
        </div>
      </div>
    )
  }
}

ArticleHead.propTypes = {
  blog: React.PropTypes.object.isRequired,
  category: React.PropTypes.object.isRequired,
  center: React.PropTypes.bool,
  link: React.PropTypes.bool,
  marginTop: React.PropTypes.number,
  marginBottom: React.PropTypes.number
};
export default CSSModules(ArticleHead, styles);
