import React from 'react';
import AnimationGroup from 'react-addons-css-transition-group';
import 'font-awesome/css/font-awesome.css';
import './Global.scss';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';

class Layout extends React.Component {
  render() {
    const { location, ...props } = this.props;
    const styles = require('./Layout.scss');
    return (
      <div className={styles.container}>
        <Navigation {...props} />
        <AnimationGroup
          transitionName={{
            enter: styles.enter,
            enterActive: styles.enterActive,
            leave: styles.leave,
          }}
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={3}
        >
          <div className={styles.main} key={location.pathname} >
            {React.cloneElement(this.props.children, { ...props })}
          </div>
          <Footer key={location.key} />
        </AnimationGroup>
      </div>
    );
  }
}

export default Layout;
