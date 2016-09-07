import React from 'react';
import styles from './ArticleToC.scss';

export default class ArticleTOC extends React.Component {

  constructor(props) {
    super(props);
    this.lastScroll = 0;
    const tocArr = props.toc.toJS();
    this.enableToc = tocArr && tocArr.length != 0;

    function getTocSeq(toc) {
      if (!toc || toc.length == 0) {
        return;
      }
      let seq = [];
      for (let i = 0; i < toc.length; i++) {
        seq.push(toc[i].id);
        seq = seq.concat(getTocSeq(toc[i].children));
      }
      return seq;
    }

    if (this.enableToc) {
      this.scrollListener = this.listenScroll.bind(this);
      this.tocSeq = getTocSeq(tocArr).filter(x => x);
      this.currentItem = 0;
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.toc != this.props.toc;
  }

  componentDidMount() {
    if (this.enableToc) {
      setElementActive(this.refs.tocPanel.getElementsByTagName('a')[0]);
      window.addEventListener('scroll', this.scrollListener)
    }
  }

  componentWillUnmount() {
    if (this.enableToc) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  generateToc(toc, indexArr = []) {
    if (!toc || toc.length == 0) {
      return;
    }
    let arr = [];
    for (let i = 0; i < toc.length; i++) {
      const curIndexArr = indexArr.concat(i + 1);
      const childOL = this.generateToc(toc[i].children, curIndexArr);
      arr.push(
        <li key={toc[i].id}>
          <a ref={toc[i].id} id={`toc-${toc[i].id}`} href="javascript:" onClick={() => this.jumpTo(toc[i].id)}>
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
      <div className={styles.tocPanel} ref="tocPanel">
        {this.generateToc(toc.toJS())}
      </div>
    )
  }


  handleScrollDown(y) {
    if (y >= this.getScrollTop(document.getElementById(this.tocSeq[this.currentItem + 1]))) {
      removeElementActive(document.getElementById('toc-' + this.tocSeq[this.currentItem]));
      setElementActive(document.getElementById('toc-' + this.tocSeq[this.currentItem + 1]));
      this.currentItem++;
    }
  }

  handleScrollUp(y) {
    if (this.currentItem > 0 && y <= this.getScrollTop(document.getElementById(this.tocSeq[this.currentItem]), 80)) {
      removeElementActive(document.getElementById('toc-' + this.tocSeq[this.currentItem]));
      setElementActive(document.getElementById('toc-' + this.tocSeq[this.currentItem - 1]));
      this.currentItem--;
    }
  }

  listenScroll() {
    const y = document.body.scrollTop;
    try {
      if (y >= this.lastScroll) {
        this.handleScrollDown(y);
      } else {
        this.handleScrollUp(y);
      }
      this.lastScroll = y;
    } catch (e) {

    }
  }

  getScrollTop(elem, offset) {
    return elem.offsetTop + elem.offsetParent.offsetTop - (offset || 20);
  }

  jumpTo(id) {
    window.scrollTo(0, this.getScrollTop(document.getElementById(id)));
    removeElementActive(this.refs.tocPanel.getElementsByClassName('active')[0]);
    setElementActive(this.refs[id]);
    this.currentItem = this.tocSeq.indexOf(id);
  }
}

ArticleTOC.propTypes = {
  toc: React.PropTypes.object
};

function setElementActive(elem) {
  elem.className = 'active';
}
function removeElementActive(elem) {
  elem.className = '';
}
