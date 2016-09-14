import React from 'react';
import { submitComment } from '../../actions/comment';
import styles from './CommentForm.scss'
import CSSModule from 'react-css-modules';

@CSSModule(styles)
export default class CommentForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      email: '',
      url: '',
      content: '',
      userError: null,
      emailError: null,
      urlError: null,
      contentError: null,
      submitError: null
    }
  }

  submit() {
    if (!this.isValid()) {
      return;
    }
    const { dispatch, blog, replyComment, onSubmit } = this.props;
    dispatch(submitComment(blog.get('code'), {
      user: this.state.user,
      email: this.state.email,
      url: this.state.url,
      content: this.state.content,
      reply_id: replyComment && replyComment.get('_id')
    })).then(() => {
      this.setState({
        user: '',
        email: '',
        url: '',
        content: '',
        userError: null,
        emailError: null,
        urlError: null,
        contentError: null,
        submitError: null
      });
      onSubmit && onSubmit();
    })
  }

  render() {
    const { replyComment } = this.props;
    return (
      <div className={styles.container}>
        {replyComment
          ? <div className={styles.reply}>回复 {replyComment.get('user')}</div>
          : <div className={styles.title}>发表评论</div>
        }
        <div className={styles.row}>
          <div className={styles.key}>用户名</div>
          <input className={styles.input}
            onChange={e => this.changeUser(e.target.value)}
            value={this.state.user}
          />
          <div className={styles.info}>（必填）</div>
          { this.state.userError && <div className={styles.error}>{this.state.userError}</div> }
        </div>
        <div className={styles.row}>
          <div className={styles.key}>电子邮箱</div>
          <input className={styles.input}
            onChange={e => this.changeEmail(e.target.value)}
            value={this.state.email}
          />
          <div className={styles.info}>（必填）</div>
          { this.state.emailError && <div className={styles.error}>{this.state.emailError}</div> }
        </div>
        <div className={styles.row}>
          <div className={styles.key}>个人网站</div>
          <input className={styles.input}
            onChange={e => this.changeUrl(e.target.value)}
            value={this.state.url}
          />
          <div className={styles.info}>（选填）</div>
          { this.state.urlError && <div className={styles.error}>{this.state.urlError}</div> }
        </div>
        <div className={styles.row}>
          <div className={styles.key}>评论内容</div>
          <textarea className={styles.textarea}
            onChange={e => this.changeContent(e.target.value)}
            value={this.state.content}
          />
          { this.state.contentError && <div className={styles.error}>{this.state.contentError}</div> }
        </div>
        <div className={styles.row}>
          <div className={styles.key}></div>
          <a className={styles.submit}
             styleName={this.isValid.call(this) ? null : 'disabled'}
             href="javascript:"
             onClick={() => this.submit()}
          >发表评论</a>
          { this.state.submitError && <div className={styles.error}>{this.state.submitError}</div> }
        </div>
      </div>
      )
  }

  changeUser(user) {
    this.setState({user});
    if (user.length === 0) {
      return this.setState({userError: '请输入用户名'})
    }
    if (!/^[\u4e00-\u9fa5\w][- \u4e00-\u9fa5\w]{0,15}[\u4e00-\u9fa5\w]$/.test(user)) {
      return this.setState({userError: '至少2个字符, 勿使用特殊字符'})
    }
    this.setState({userError: null})
  }

  changeEmail(email) {
    this.setState({email});
    if (email.length === 0) {
      return this.setState({emailError: '请输入邮箱'})
    }
    if (!/^\w[-\w\.]*@\w[-\w\.]*\.[a-zA-Z]+$/.test(email)) {
      return this.setState({emailError: '邮箱格式错误'})
    }
    this.setState({emailError: null})
  }

  changeUrl(url) {
    this.setState({url});
    if (url.length === 0) {
      return this.setState({urlError: null})
    }
    if (!/^(?:https?:\/\/)?\w[-\w\.]*\.[a-zA-Z]+$/.test(url)) {
      return this.setState({urlError: 'URL格式错误'})
    }
    this.setState({urlError: null})
  }

  changeContent(content) {
    this.setState({content});
    if (content.length === 0) {
      return this.setState({contentError: '请输入评论内容'})
    }
    this.setState({contentError: null})
  }

  isValid() {
    return !(this.state.userError
          || this.state.emailError
          || this.state.urlError
          || this.state.contentError)
          && this.state.user.length !== 0
          && this.state.email.length !== 0
          && this.state.content.length !== 0
  }
}