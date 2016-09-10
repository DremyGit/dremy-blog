import React from 'react';
import { Link } from 'react-router';
import styles from './Pager.scss';
import CSSModules from 'react-css-modules';

@CSSModules(styles)
class Pager extends React.Component {

  render() {
    const { totalNum, currentPage, showPage, perPage, baseUrl } = this.props;
    const totalPage = Math.ceil(totalNum / perPage);
    const pageNumber = [];
    const showObj = {
      prev: currentPage !== 1,
      next: currentPage !== totalPage,
      start: currentPage - Math.floor(showPage / 2),
      end: currentPage + Math.floor(showPage / 2)
    };
    if (showObj.start < 1) {
      showObj.start = 1;
    }
    if (showObj.end > totalPage) {
      showObj.end = totalPage;
    }
    for (var i = showObj.start; i <= showObj.end; i++) {
      pageNumber.push(
        <li key={i} styleName={i === currentPage ? 'active' : null}>
          <Link to={baseUrl + '/' + i}>{i}</Link>
        </li>
      )
    }

    return (
      <div styleName="pager">
        {showObj.prev
          ? <Link styleName="linkPrev" to={'/blog/p/' + (currentPage - 1)}>&lt; Prev</Link>
          : null
        }
        <div styleName="wrap">
          <ul styleName="numberGroup">
            {pageNumber}
          </ul>
        </div>
        {showObj.next
          ? <Link styleName="linkNext" to={'/blog/p/' + (currentPage + 1)}>Next &gt;</Link>
          : null
        }
      </div>
    )
  }
}

Pager.PropTypes = {
  totalNum: React.PropTypes.number.isRequired,
  currentPage: React.PropTypes.number.isRequired,
  perPage: React.PropTypes.number.isRequired,
  showPage: React.PropTypes.number.isRequired,
  baseUrl: React.PropTypes.string.isRequired
};
export default Pager;