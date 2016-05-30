import React from 'react';
import { Link } from 'react-router';
import styles from './ArticleBody.scss';

class ArticleBody extends React.Component {
  render() {
    return (
      <div className={styles.article} dangerouslySetInnerHTML={{__html: this.props.html}}></div>
    )
  }
}
ArticleBody.PropTypes = {
  html: React.PropTypes.string.isRequired
};

export default ArticleBody;