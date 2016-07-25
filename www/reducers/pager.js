import { Map, List, fromJS } from 'immutable';
import { FETCH_ALL_BLOG_SUCCESS } from '../constants/blog';

const pager = (state = Map(), action = {}) => {
  switch (action.type) {
    case FETCH_ALL_BLOG_SUCCESS:
      return state.set('blog', fromJS({
        list: action.data.result,
        size: 3
      }));
    default:
      return state;
  }
};

export default pager;