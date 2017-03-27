import React from 'react';
import styles from './CommentItem.scss';
import { timeFormat } from '../../utils/time';
import CommentForm from './CommentForm';

export default class CommentItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      commentForm: false,
    };
  }

  render() {
    const { commentId, commentEntities } = this.props;
    const comment = commentEntities.get(commentId);
    const UserSpan = (props) => {
      const { user, url } = props;
      if (user === 'dremy' || user === 'Dremy') {
        return <span>Dremy<span className={styles.host}>（博主）</span></span>;
      }
      if (url) {
        return <a target="_blank" rel="noopener noreferrer" className="underline" href={url}>{user}</a>;
      }
      return <span>{user}</span>;
    };
    return (
      <div className={styles.item}>
        <div className={styles.info}>
          <UserSpan user={comment.get('user')} url={comment.get('url')} />
          {
            comment.getIn(['reply_to', 'user']) &&
            <span>
              &nbsp;回复&nbsp;
              <UserSpan
                user={comment.getIn(['reply_to', 'user'])}
                url={comment.getIn(['reply_to', 'url'])}
              />
            </span>
          }
          ：
        </div>
        <div className={styles.container}>
          <div className={styles.content}>{comment.get('content')}</div>
          <div className={styles.line}>
            <span className={styles.time}>{timeFormat(new Date(comment.get('create_at')))}</span>
            <a className={styles.link}>赞</a>
            <a
              className={styles.link}
              onClick={() => this.setState({ commentForm: !this.state.commentForm })}
            >
              回复
            </a>
          </div>
          {this.state.commentForm &&
            <div className={styles.commentForm}>
              <CommentForm
                dispatch={this.props.dispatch}
                blog={this.props.blog}
                replyComment={comment}
                onSubmit={() => this.setState({ commentForm: false })}
              />
            </div>
          }
          {commentEntities.getIn([commentId, 'replies']).map(replyId =>
            <CommentItem
              key={replyId}
              commentId={replyId}
              commentEntities={commentEntities}
              dispatch={this.props.dispatch}
              blog={this.props.blog}
            />,
          ).toArray()}
        </div>
      </div>
    );
  }
}
