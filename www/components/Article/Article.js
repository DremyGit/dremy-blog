import React from 'react';
import ArticleBody from './ArticleBody';
import ArticleHead from './ArticleHead';
import ArticleTOC from './ArticleToC';
import styles from './Article.scss';

export default class Article extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.blog !== this.props.blog
        || nextProps.category !== this.props.category;
  }
  render() {
    const { blog, category } = this.props;
    return (
      <div>
        <div className={styles.top}>
          <ArticleHead
            blog={blog}
            category={category}
            center={true}
            marginTop={80}
            marginBottom={40}
          />
          <ArticleBody html={blog.getIn(['html', 'body'])} />
          <ArticleTOC toc={blog.get('toc')} />
        </div>
      </div>
    )
  }
}
ArticleHead.propTypes = {
  blog: React.PropTypes.object.isRequired,
  category: React.PropTypes.object.isRequired
};
