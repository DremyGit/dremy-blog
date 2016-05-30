import {
  FETCH_BLOG_LIST_FETCHING,
  FETCH_BLOG_LIST_SUCCESS,
  FETCH_BLOG_LIST_FAIL
} from '../constants/blog'

import { normalize, arrayOf} from 'normalizr'
import { blogSchema } from '../reducers/schema';
import 'isomorphic-fetch'

function fetchBlogList() {
  return {
    type: FETCH_BLOG_LIST_FETCHING
  }
}

function fetchBlogListSuccess(data) {
  return {
    type: FETCH_BLOG_LIST_SUCCESS,
    data: data
  }
}

function fetchBlogListFail(error) {
  return {
    type: FETCH_BLOG_LIST_FAIL,
    error: error
  }
}

function shouldFetchBlogs(state) {
  console.log(state);
  const blogs = state.blogs;
  console.log(blogs.get('loaded') , blogs.get('loading'));
  if (blogs.get('loaded') || blogs.get('loading')) {
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
