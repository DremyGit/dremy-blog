import {
  FETCH_BLOG_FETCHING,
  FETCH_BLOG_FAILED,
  FETCH_BLOG_SUCCESS,
  FETCH_ALL_BLOG_FETCHING,
  FETCH_ALL_BLOG_SUCCESS,
  FETCH_ALL_BLOG_FAIL
} from '../constants/blog'

import { normalize, arrayOf} from 'normalizr'
import { blogSchema } from '../reducers/schema';
import 'isomorphic-fetch'

function fetchBlogFetching(name) {
  return {
    type: FETCH_BLOG_FETCHING,
    name: name
  }
}

function fetchBlogSuccess(data) {
  return {
    type: FETCH_BLOG_SUCCESS,
    data: data
  }
}

function fetchBlogFailed(error) {
  return {
    type: FETCH_BLOG_FAILED,
    error: error
  }
}

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
  return !(state.blogs && state.blogs.size);
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

function shouldFetchBlog(blogId, state) {
  return !(state.blogs && state.blogs.getIn([blogId, 'html', 'body']));
}

export const fetchBlogIfNeed = (blogId) => {
  return (dispatch, getState) => {
    if (shouldFetchBlog(blogId, getState())) {
      dispatch(fetchBlogFetching(blogId));
      return fetch(`/api/blogs/${blogId}`)
        .then(res => res.json())
        .then(res => {
          res = normalize(res, blogSchema);
          dispatch(fetchBlogSuccess(res));
        }).catch(fetchBlogFailed)
    } else {
      return Promise.resolve();
    }
  }
};
