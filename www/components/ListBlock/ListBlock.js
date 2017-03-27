import React from 'react';
import { Link } from 'react-router';
import ListItem from './ListItem';
import ListLine from './ListLine';
import styles from './ListBlock.scss';

export default class ListBlock extends React.Component {


  shouldComponentUpdate(nextProps) {
    return nextProps.blogs !== this.props.blogs
        || nextProps.title !== this.props.title;
  }

  render() {
    const { blogs, title, link } = this.props;
    const sortedBlogs = blogs.sort((a, b) => {
      if (a.get('create_at') < b.get('create_at')) return 1;
      if (a.get('create_at') > b.get('create_at')) return -1;
      return 0;
    });
    const components = [];
    for (let i = 0; i < sortedBlogs.size; i++) {
      if (i !== 0) {
        components.push(<ListLine key={`line-${i}`} />);
      }
      components.push(<ListItem key={`blog-${i}`} blog={sortedBlogs.get(i)} />);
    }
    return (
      <div className={styles.block}>
        <div className={styles.title}>
          <Link to={link}>
            {title}
            <span className={styles.span}>
              （ {sortedBlogs.size} 篇文章）
            </span>
          </Link>
        </div>
        <div className={styles.list}>
          {components}
        </div>
      </div>
    );
  }
}

ListBlock.propTypes = {
  blogs: React.PropTypes.object.isRequired,
  title: React.PropTypes.string.isRequired,
  link: React.PropTypes.string.isRequired,
};
