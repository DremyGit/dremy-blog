import React from 'react';
import CommentForm from './CommentForm';

export default class CommentArea extends React.Component {

  render() {
    return (
      <div>
        <CommentForm {...this.props}/>
      </div>
    )
  }
}
