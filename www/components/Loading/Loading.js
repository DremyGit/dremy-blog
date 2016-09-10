import React from 'react';
import styles from './Loading.scss';

const loading = () => (
  <div className={styles.container}>
    <div className={styles.spinner}></div>
  </div>
)

export default loading;
