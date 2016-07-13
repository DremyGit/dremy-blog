import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import './Global.scss';
import 'font-awesome/css/font-awesome.css';
import Navigation from '../Navigation/Navigation';

const maxWidth = '800px';

class Layout extends React.Component {
  render() {
    const { ...props } = this.props;
    const styles = require('./Layout.scss');
    return (
      <div>
        <Navigation {...props} />
        <div className={styles.main} >
          {React.cloneElement(this.props.children, { ...props })}
        </div>
      </div>
    )
  }
}

//export default connect(state => state)(Layout)
export default Layout