import React from 'react';
import styles from './Footer.scss';

const Pop = (props) => {
  return (
    <div className={styles.pop}>
      <div>
        <a href={props.url} >{props.info}</a>
      </div>
    </div>
  );
};

export default class Footer extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.center}>
          <div className={styles.left}>
            <div>Copyright &copy; 2017 dremy.cn</div>
            <div>皖ICP备16015002号</div>
          </div>
          <div className={styles.right}>
            <div>
              <Pop info="@DremyGit" url="https://github.com/DremyGit" />
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/DremyGit">
                <img className={styles.github} alt="GitHub" src={require('./github.png')} />
              </a>
            </div>
            <div>
              <Pop info="https://dremy.cn/rss.xml" />
              <a target="_blank" rel="noopener noreferrer" href="https://dremy.cn/rss.xml">
                <img src={require('./rss.png')} alt="RSS" />
              </a>
            </div>
            <div>
              <Pop info="@DremyCode" url="http://weibo.com/DremyCode" />
              <a target="_blank" rel="noopener noreferrer" href="http://weibo.com/DremyCode">
                <img className={styles.weibo} alt="Weibo" src={require('./weibo.png')} />
              </a>
            </div>
            <div>
              <Pop info="dremy@dremy.cn" url="mailto:dremy@dremy.cn" />
              <a href="mailto:dremy@dremy.cn">
                <img src={require('./mail.png')} alt="Email" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
