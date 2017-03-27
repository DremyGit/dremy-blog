import React from 'react';
import styles from './ArticleBody.scss';
import '../../assets/highlightjs/solarized-light.css';

/* global hljs */
export default class ArticleBody extends React.Component {
  componentDidMount() {
    const codeAreas = this.article.querySelectorAll('pre > code:not(.hljs)');
    for (let i = 0; i < codeAreas.length; i += 1) {
      hljs.highlightBlock(codeAreas[i]);
    }
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.html !== this.props.html;
  }
  render() {
    return (
      <div
        ref={(article) => { this.article = article; }}
        className={styles.article}
        dangerouslySetInnerHTML={{ __html: this.props.html }}
      />
    );
  }
}
ArticleBody.PropTypes = {
  html: React.PropTypes.string.isRequired,
};
