import React from 'react';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import ArticleBody from '../Article/ArticleBody';
import ArticleHead from '../Article/ArticleHead';
import styles from './BlogItem.scss';

class BlogItem extends React.Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.blog !== this.props.blog;
  }

  render() {
    const { blog, category, tags } = this.props;
    return (
      <div styleName="blogItem">
        <ArticleHead
          blog={blog}
          category={category}
          tags={tags}
          center={false}
          link
        />
        <ArticleBody
          html={blog.getIn(['html', 'summary'])}
        />
        <div styleName="look">
          <Link to={`/blog/${blog.get('code')}`}>查看全文 &gt;</Link>
        </div>
      </div>
    );
  }
}

BlogItem.propTypes = {
  blog: React.PropTypes.object.isRequired,
  category: React.PropTypes.object.isRequired,
};
export default CSSModules(BlogItem, styles);
