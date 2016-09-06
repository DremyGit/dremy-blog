import React from 'react';
import styles from './ArticleToC.scss';

export default class ArticleTOC extends React.Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.toc != this.props.toc;
  }

  jumpTo(id) {
    const elem = document.getElementById(id);
    window.scrollTo(0, elem.offsetTop + elem.offsetParent.offsetTop - 20);
  }

  travel(toc, indexArr = []) {
    if (!toc || toc.length == 0) {
      return;
    }
    let arr = [];
    for (let i = 0; i < toc.length; i++) {
      const curIndexArr = indexArr.concat(i + 1);
      const childOL = this.travel(toc[i].children, curIndexArr);
      arr.push(
        <li key={toc[i].id}>
          <a href="javascript:" onClick={() => this.jumpTo(toc[i].id)}>
            <span className={styles.number}>
              {curIndexArr.join('.')}
            </span>
            <span className={styles.text}>
              {toc[i].text}
            </span>
          </a>
            {childOL || null}
        </li>
      );
    }
    return <ul>{arr}</ul>;
  }

  render() {
    const { toc } = this.props;
    return (
      <div className={styles.tocPanel}>
        {this.travel(toc.toJS())}
      </div>
    )
  }
}

ArticleTOC.propTypes = {
  toc: React.PropTypes.object
};