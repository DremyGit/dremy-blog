import {
  FETCH_BLOG_FETCHING,
  FETCH_BLOG_FAILED,
  FETCH_BLOG_SUCCESS,
  FETCH_ALL_BLOG_FETCHING,
  FETCH_ALL_BLOG_SUCCESS,
  FETCH_ALL_BLOG_FAIL
} from '../constants/blog'

import {
  FETCH_CATEGORY_LIST_FETCHING,
  FETCH_CATEGORY_LIST_SUCCESS
} from '../constants/category';

import { normalize, arrayOf} from 'normalizr'
import { blogSchema } from '../reducers/schema';
import { getData } from '../helpers/fetchUtils';

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
  //return !(state.get('blogs') && state.get('blogs').size);
  return !state.getIn(['blog', 'isFetched']);
}

export const fetchBlogListIfNeed = () => {
  return (dispatch, getState) => {
    if (shouldFetchBlogs(getState())) {
      dispatch(fetchBlogList());
      return getData('/blogs').then(data => {
        data = normalize(data, arrayOf(blogSchema));
        return dispatch(fetchBlogListSuccess(data))
      });
    } else {
      return Promise.resolve();
    }
  }
};

function shouldFetchBlog(blogId, state) {
  return !(state.getIn(['blog', 'entities', blogId, 'html', 'body']));
}

export const fetchBlogIfNeed = (params) => {
  const blogId = params.blogName;
  return (dispatch, getState) => {
    if (shouldFetchBlog(blogId, getState())) {
      dispatch(fetchBlogFetching(blogId));
      return getData(`/blogs/${blogId}`).then(data => {
        data = normalize(data, blogSchema);
        return dispatch(fetchBlogSuccess(data));
      });
    } else {
      return Promise.resolve();
    }
  }
};

