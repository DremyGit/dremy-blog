import React from 'react';
import { submitComment } from '../../actions/comment';
import styles from './CommentForm.scss'

export default class CommentForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      email: '',
      url: '',
      content: ''
    }
  }

  submit() {
    const { dispatch, blog, replyComment } = this.props;
    dispatch(submitComment(blog.get('code'), {
      user: this.state.user,
      email: this.state.email,
      url: this.state.url,
      content: this.state.content,
      reply_id: replyComment && replyComment._id
    }));
  }


  render() {
    const { replyComment } = this.props;
    return (
      <div>
        {replyComment
          ? <div className={styles.reply}>回复 {replyComment.user}</div>
          : <div className={styles.title}>发表评论</div>
        }
        <div className={styles.row}>
          <div className={styles.key}>用户名</div>
          <input className={styles.input}
            onChange={(e) => this.setState({user: e.target.value})}
            value={this.state.user}
          />
          <div className={styles.info}>（必填）</div>
        </div>
        <div className={styles.row}>
          <div className={styles.key}>电子邮箱</div>
          <input className={styles.input}
            onChange={(e) => this.setState({email: e.target.value})}
            value={this.state.email}
          />
          <div className={styles.info}>（必填）</div>
        </div>
        <div className={styles.row}>
          <div className={styles.key}>个人网站</div>
          <input className={styles.input}
            onChange={(e) => this.setState({url: e.target.value})}
            value={this.state.url}
          />
          <div className={styles.info}>（选填）</div>
        </div>
        <div className={styles.row}>
          <div className={styles.key}>评论内容</div>
          <textarea className={styles.textarea}
            onChange={e => this.setState({content: e.target.value})}
            value={this.state.content}
          />
        </div>
        <div className={styles.row}>
          <div className={styles.key}></div>
          <a className={styles.submit}
             href="javascript:"
             onClick={() => this.submit()}
          >发表评论</a>
        </div>
      </div>
      )
  }
}