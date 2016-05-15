import React from 'react';
import { Link } from 'react-router';
import './Navigation.scss';

const Navigation = () => {
  return (
    <div className="header">
      <div className="navigation">
        <Link to="/"><span id="logo">Dremy_博客</span></Link>
        <ul className="menu">
          <li><Link to="/category">分类</Link></li>
          <li><Link to="/tag">标签</Link></li>
          <li><Link to="/archive">归档</Link></li>
          <li><Link to="/about">关于</Link></li>
        </ul>
        <div id="search">
          <i className="fa fa-search" aria-hidden="true"></i>
          <input type="text" />
        </div>
      </div>
    </div>
  )
};

export default Navigation;
