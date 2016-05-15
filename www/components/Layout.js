import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import './Layout.scss';
import 'font-awesome/css/font-awesome.css';
import Navigation from './Navigation';

class Layout extends React.Component {
  render() {
    const { ...props } = this.props;
    return (
      <div>
        <Navigation />
        <div >
          {React.cloneElement(this.props.children, { ...props })}
        </div>
      </div>
    )
  }
}

export default connect(state => state)(Layout)
