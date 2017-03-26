import React from 'react';
import { Link } from 'react-router';
import styles from './ArticleBody.scss';
import '../../assets/highlightjs/solarized-light.css';

export default class ArticleBody extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.html !== this.props.html;
  }
  componentDidMount() {
    //console.log(this.refs.div);
    const codeAreas = this.refs.article.querySelectorAll('pre > code:not(.hljs)');
    for (let i = 0; i < codeAreas.length; i++) {
      hljs.highlightBlock(codeAreas[i]);
    }
  }
  render() {
    return (
      <div ref="article"
        className={styles.article}
        dangerouslySetInnerHTML={{__html: this.props.html}}
      />
    )
  }
}
ArticleBody.PropTypes = {
  html: React.PropTypes.string.isRequired
};
