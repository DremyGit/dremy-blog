import React from 'react';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import Loading from '../Loading/Loading';
import styles from './CommentArea.scss';

export default class CommentArea extends React.Component {

  render() {
    const { commentEntities, comments } = this.props;
    return (
      <div className={styles.commentArea}>
        <h3 className={styles.title}>评论区</h3>
        <div className={styles.container}>
          { comments
            ? comments.map(commentId =>
              <CommentItem
                key={commentId}
                commentId={commentId}
                {...this.props}
              />).toArray()
            : <Loading />
          }
          <CommentForm {...this.props}/>
        </div>
      </div>
    )
  }
}
