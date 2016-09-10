import React from 'react';
import styles from './Footer.scss';

export default class Footer extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.center}>
          <div>&copy; 2014-2016 dremy.cn. All Rights Reserved.</div>
          <div>Powered by React</div>
          <div>皖ICP备16015002号</div>
        </div>
      </div>
    )
  }
}