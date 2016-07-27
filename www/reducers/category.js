import { FETCH_BLOG_SUCCESS, FETCH_ALL_BLOG_SUCCESS } from '../constants/blog'
import { Map } from 'immutable';

const categories = (state = Map(), action = {}) => {
  switch (action.type) {
    case FETCH_BLOG_SUCCESS:
      return state.mergeDeep({
        entities: action.data.entities.category
      });
    case FETCH_ALL_BLOG_SUCCESS:
      return state.mergeDeep({
        entities: action.data.entities.category,
        result: Object.getOwnPropertyNames(action.data.entities.category),
        isFetched: true
      });

    default:
      return state;
  }
};

export default categories;
