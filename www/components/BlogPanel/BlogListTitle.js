import React from 'react';
import styles from './BlogListTitle.scss';

export default class BlogListTitle extends React.Component {

  shouldComponentUpdate(nextProps) {
    return !nextProps.title !== this.props.title
        || !nextProps.count !== this.props.count;
  }

  render() {
    const { title, count } = this.props;
    return (
      <div className={styles.title}>
        {title}
        <span className={styles.count}>（共 {count} 篇文章）</span>
      </div>
    );
  }
}
