import { FETCH_BLOG_SUCCESS, FETCH_ALL_BLOG_SUCCESS } from '../constants/blog'
import { Map } from 'immutable';

const categories = (state = Map(), action = {}) => {
  switch (action.type) {
    case FETCH_BLOG_SUCCESS:
    case FETCH_ALL_BLOG_SUCCESS:
      return state.merge(action.data.entities.categories);

    default:
      return state;
  }
};

export default categories;
