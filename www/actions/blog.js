import {
  FETCH_ALL_BLOG_FETCHING,
  FETCH_ALL_BLOG_SUCCESS,
  FETCH_ALL_BLOG_FAIL
} from '../constants/blog'

import { normalize, arrayOf} from 'normalizr'
import { blogSchema } from '../reducers/schema';
import 'isomorphic-fetch'

function fetchBlogList() {
  return {
    type: FETCH_ALL_BLOG_FETCHING
  }
}

function fetchBlogListSuccess(data) {
  return {
    type: FETCH_ALL_BLOG_SUCCESS,
    data: data
  }
}

function fetchBlogListFail(error) {
  return {
    type: FETCH_ALL_BLOG_FAIL,
    error: error
  }
}

function shouldFetchBlogs(state) {
  console.log(state);
  const status = state.status;
  console.log(status.get('fetched') , status.get('fetching'));
  if (status.get('fetched') || status.get('fetching')) {
    return false
  } else {
    return true
  }
}

export const fetchBlogListIfNeed = () => {
  return (dispatch, getState) => {
    if (shouldFetchBlogs(getState())) {
      dispatch(fetchBlogList());
      return fetch('/api/blogs')
        .then(res => res.json())
        .then(res => {
          res = normalize(res, arrayOf(blogSchema));
          dispatch(fetchBlogListSuccess(res))
        }).catch(fetchBlogListFail);
    } else {
      return Promise.resolve();
    }
  }
};
