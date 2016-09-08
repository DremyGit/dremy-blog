import React from 'react';
import { Link } from 'react-router';
import styles from './TagItem.scss';

export default class Tag extends React.Component {

  render() {
    const { name, fontSize, link } = this.props;
    return <div className={styles.tag} style={{fontSize: fontSize}}><Link to={link}>{name}</Link></div>
  }
}

Tag.PropTypes = {
  name: React.PropTypes.string.isRequired,
  fontSize: React.PropTypes.number.isRequired,
  link: React.PropTypes.string.isRequired
};