import React from 'react';
import styles from './BlogListTitle.scss';

export default class BlogListTitle extends React.Component {

  render() {
    const { title, count } = this.props;
    return (
      <div className={styles.title}>
        {title}
        <span className={styles.count}>（共 {count} 篇文章）</span>
      </div>
    )
  }
}