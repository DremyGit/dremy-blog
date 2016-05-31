import { Map } from 'immutable'
import {
  FETCH_ALL_BLOG_FETCHING,
  FETCH_ALL_BLOG_SUCCESS,
  FETCH_ALL_BLOG_FAIL
} from '../constants/blog'

const status = (state = Map(), action = {}) => {
  switch (action.type) {
    case FETCH_ALL_BLOG_FETCHING:
      console.log('FETCH_ALL_BLOG_FETCHING');
      return state.merge({
        fetching: true
      });
    case FETCH_ALL_BLOG_SUCCESS:
      return state.merge({
        fetching: false,
        fetched: true,
        fetched_at: Date.now(),
        fetched_blog: action.data.result,
        error: null
      });
    case FETCH_ALL_BLOG_FAIL:
      return state.merge({
        fetching: false,
        fetched: false,
        error: action.data.error
      });
    default:
      return state;
  }
};
export default status;
