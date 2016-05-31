import { FETCH_BLOG_LIST_SUCCESS } from '../constants/blog'
import { Map } from 'immutable';

const categories = (state = Map(), action = {}) => {
  switch (action.type) {
    case FETCH_BLOG_LIST_SUCCESS:
      return state.merge(action.data.entities.categories);

    default:
      return state;
  }
};

export default categories;
