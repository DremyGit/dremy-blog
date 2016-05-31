import { FETCH_BLOG_LIST_SUCCESS } from '../constants/blog'
import { Map } from 'immutable';

const tags = (state = Map(), action = {}) => {
  switch (action.type) {
    case FETCH_BLOG_LIST_SUCCESS:
      return state.merge(action.data.entities.tags);

    default:
      return state;
  }
};

export default tags;
