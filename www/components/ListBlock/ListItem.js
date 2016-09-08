import React from 'react';
import styles from './ListItem.scss';
import { Link } from 'react-router';

export default class ListItem extends React.Component {

  render() {
    const { blog } = this.props;
    const date = new Date(blog.get('create_at'));
    const yyyy = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const mm = m < 10 ? '0' + m : '' + m;
    const dd = d < 10 ? '0' + d : '' + d;
    return (
      <div>
        <div className={styles.cycle}></div>
        <div className={styles.date}>{yyyy + '-' + mm + '-' + dd}</div>
        <div className={styles.text}><Link to={`/blog/${blog.get('code')}`}>{blog.get('title')}</Link></div>
      </div>
    )
  }
}
ListItem.propTypes = {
    blog: React.PropTypes.object.isRequired
};
