import React from 'react';
import { Link } from 'react-router';
import styles from './ArticleBody.scss';

class ArticleBody extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.html !== this.props.html;
  }
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