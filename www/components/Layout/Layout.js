import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import AnimationGroup from 'react-addons-css-transition-group';
import './Global.scss';
import 'font-awesome/css/font-awesome.css';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';

const maxWidth = '800px';

class Layout extends React.Component {
  render() {
    const { ...props, location } = this.props;
    const styles = require('./Layout.scss');
    return (
      <div>
        <Navigation {...props} />
        <AnimationGroup
          transitionName={{
            enter: styles.enter,
            enterActive: styles.enterActive,
            leave: styles.leave
          }}
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={3}
        >
          <div className={styles.main} key={location.pathname} >
            {React.cloneElement(this.props.children, { ...props })}
          </div>
          <Footer key={location.key}/>
        </AnimationGroup>
      </div>
    )
  }
}

//export default connect(state => state)(Layout)
export default Layout
