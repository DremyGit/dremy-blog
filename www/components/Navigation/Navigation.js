import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import styles from './Navigation.scss';

@connect(state => ({}))
@CSSModules(styles)
class Navigation extends React.Component {
  isActiveMenu(menu) {
    const { routes } = this.props;
    return routes[1] && routes[1].path === menu.href;
  }
  render() {
    const menus = [
      { href: 'category', name: '分类' },
      { href: 'tag', name: '标签' },
      { href: 'archive', name: '归档' },
      { href: 'about', name: '关于' }
    ];
    const { maxWidth } = this.props;
    const styles = require('./Navigation.scss');
    const menuList = menus.map(menu => {
      return (
        <li key={menu.href} className={styles.listItem} styleName={this.isActiveMenu(menu)?'active':null}>
          <Link styleName={'menuLink'} to={'/' + menu.href}>{menu.name}</Link>
        </li>
      )
    });
    return (
      <div styleName="header">
        <div styleName="navigation" style={{maxWidth: maxWidth}}>
          <Link to="/">
            <span styleName="logo">Dremy_博客</span>
          </Link>
          <ul styleName="menu">
            {menuList}
          </ul>
          <div styleName="search">
            <i className="fa fa-search" aria-hidden="true" />
            <input styleName="searchInput" type="text" />
          </div>
        </div>
      </div>
    )
  }
}

Navigation.PropTypes = {
  maxWidth: React.PropTypes.string.isRequired
}

export default Navigation;
