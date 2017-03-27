import React from 'react';
import { Link } from 'react-router';
import styles from './ListItem.scss';
import { dateFormat } from '../../utils/time';

export default class ListItem extends React.Component {

  render() {
    const { blog } = this.props;
    const date = new Date(blog.get('create_at'));
    return (
      <div>
        <div className={styles.cycle} />
        <div className={styles.date}>{dateFormat(date)}</div>
        <div className={styles.text}><Link to={`/blog/${blog.get('code')}`}>{blog.get('title')}</Link></div>
      </div>
    );
  }
}
ListItem.propTypes = {
  blog: React.PropTypes.object.isRequired,
};
