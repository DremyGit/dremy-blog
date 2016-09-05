import React from 'react';
import { Link } from 'react-router';
import styles from './ArticleBody.scss';
import '../assets/highlightjs/solarized-light.css';

class ArticleBody extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.html !== this.props.html;
  }
  componentDidMount() {
    //console.log(this.refs.div);
    this.refs.article.querySelectorAll('pre > code').forEach(element => {
      console.log(element);
      hljs.highlightBlock(element);
    })
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

export default ArticleBody;