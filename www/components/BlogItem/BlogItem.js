import React from 'react';
import { Link } from 'react-router';
import ArticleBody from '../Article/ArticleBody';
import ArticleHead from '../Article/ArticleHead'
import CSSModules from 'react-css-modules';
import styles from './BlogItem.scss';
import { timeFormat } from '../../utils/time.js'


class BlogItem extends React.Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.blog !== this.props.blog
        || nextProps.category !== this.props.category;
  }

  render () {
    const { blog, category } = this.props;
    return (
      <div styleName="blogItem">
        <ArticleHead
          blog={blog}
          category={category}
          center={false}
          link={true}
        />
        <ArticleBody
          html={blog.getIn(['html', 'summary'])}
        />
        <div styleName="look">
          <Link to={`/blog/${blog.get('code')}`}>查看全文 &gt;</Link>
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
