import React from 'react';
import { Link, withRouter } from 'react-router';
import CSSModules from 'react-css-modules';
import styles from './Navigation.scss';

@withRouter
@CSSModules(styles)
class Navigation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchInput: false,
      searchContent: '',
    };
  }

  isActiveMenu(menu) {
    const { routes } = this.props;
    const part = (routes[1] && routes[1].path) || 'blog';
    return menu.pattern.test(part);
  }

  doSearch() {
    const { router } = this.props;
    router.push(`/search/${this.state.searchContent}`);
  }

  handleSearch() {
    if (!this.state.searchInput) {
      this.setState({ searchInput: true });
      this.input.focus();
    } else if (this.state.searchContent) {
      this.doSearch();
      setTimeout(() => this.setState({ searchContent: '' }), 500);
    } else {
      this.setState({ searchInput: false });
    }
  }

  handleKeyDown(e) {
    if (e.keyCode === 13 && this.state.searchContent !== '') {
      this.doSearch();
    }
  }

  render() {
    const menus = [
      { href: '', pattern: /blog/, name: '首页' },
      { href: 'category', pattern: /category/, name: '分类' },
      { href: 'tag', pattern: /tag/, name: '标签' },
      { href: 'archive', pattern: /archive/, name: '归档' },
      { href: 'about', pattern: /about/, name: '关于' },
    ];
    const { maxWidth } = this.props;
    const menuList = menus.map((menu) => {
      return (
        <li key={menu.href} className={styles.listItem} styleName={this.isActiveMenu(menu) ? 'active' : null}>
          <Link styleName={'menuLink'} to={`/${menu.href}`}>{menu.name}</Link>
        </li>
      );
    });
    return (
      <div styleName="header">
        <div styleName="navigation" style={{ maxWidth }}>
          <Link to="/">
            <span styleName="logo">Dremy_博客</span>
          </Link>
          <ul styleName="menu">
            {menuList}
          </ul>
          <div className={styles.search} styleName={this.state.searchInput && 'active'}>
            <input
              styleName="searchInput"
              ref={(input) => { this.input = input; }}
              value={this.state.searchContent}
              onChange={e => this.setState({ searchContent: e.target.value })}
              onKeyDown={e => this.handleKeyDown(e)}
              placeholder="搜索标题或关键词"
              onBlur={() => setTimeout(() => this.setState({ searchInput: false }), 300)}
            />
            <a onClick={() => this.handleSearch()}>
              <i className="fa fa-search" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

Navigation.PropTypes = {
  maxWidth: React.PropTypes.string.isRequired,
};

export default Navigation;
