import {
  FETCH_COMMENT_FETCHING,
  FETCH_COMMENT_SUCCESS,
  SUBMIT_COMMENT_FETCHING,
  SUBMIT_COMMENT_SUCCESS,
} from '../constants/comment';

import { normalize, arrayOf} from 'normalizr'
import { commentSchema } from '../reducers/schema';
import { getData, myFetch } from '../helpers/fetchUtils';

function fetchCommentFetching(blog) {
  return {
    type: FETCH_COMMENT_FETCHING,
    blog: blog
  }
}

function fetchCommentSuccess(data, blog) {
  return {
    type: FETCH_COMMENT_SUCCESS,
    data: data,
    blog: blog
  }
}

function shouldFetchComments(state, blogName) {
  return state.getIn(['blog', 'entities', blogName, 'html', 'body'])
      && !state.getIn(['comment', 'entities', blogName, 'isCommentFetched']);
}

export const fetchCommentsIfNeed = (params) => {
  return (dispatch, getState) => {
    const blogName = params.blogName;
    if (shouldFetchComments(getState(), blogName)) {
      dispatch(fetchCommentFetching(blogName));
      return getData(`/blogs/${blogName}/comments`).then(data => {
        data = normalize(data, arrayOf(commentSchema));
        return dispatch(fetchCommentSuccess(data, blogName));
      });
    } else {
      return Promise.resolve();
    }
  }
}

function submitCommentFetching() {
  return {
    type: SUBMIT_COMMENT_FETCHING
  }
}

function submitCommentSuccess(data, blog) {
  return {
    type: SUBMIT_COMMENT_SUCCESS,
    data: data,
    blog: blog
  }
}

export const submitComment = (blogName, data) => {
  return (dispatch, getState) => {
    dispatch(submitCommentFetching());
    return myFetch(`/blogs/${blogName}/comments`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => {
        if (data.statusCode >= 400) {
          throw new Error(data.message);
        }
        data = normalize(data, commentSchema);
        return dispatch(submitCommentSuccess(data, blogName))
      }).catch(err => {
        alert(err.toString());
      })
  }
};

