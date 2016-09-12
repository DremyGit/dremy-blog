import {
  SUBMIT_COMMENT_FETCHING,
  SUBMIT_COMMENT_SUCCESS
} from '../constants/comment';

import { normalize, arrayOf} from 'normalizr'
import { commentSchema } from '../reducers/schema';
import { getData, myFetch } from '../helpers/fetchUtils';
function submitCommentFetching() {
  return {
    type: SUBMIT_COMMENT_FETCHING
  }
}

function submitCommentSuccess(data) {
  return {
    type: SUBMIT_COMMENT_SUCCESS,
    data: data
  }
}

export const submitComment = (blogName, data) => {
  return (dispatch, getState) => {
    dispatch(submitCommentFetching);
    return myFetch(`/blogs/${blogName}/comments`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => {
        data = normalize(data, commentSchema);
        return dispatch(submitCommentSuccess(data))
      })
  }
};

