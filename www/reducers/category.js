import { Map } from 'immutable';
import { FETCH_BLOG_SUCCESS, FETCH_ALL_BLOG_SUCCESS } from '../constants/blog';
import { FETCH_CATEGORY_LIST_SUCCESS } from '../constants/category';

const categories = (state = Map(), action = {}) => {
  switch (action.type) {
    case FETCH_BLOG_SUCCESS:
      return state.mergeDeep({
        entities: action.data.entities.category,
      });
    case FETCH_ALL_BLOG_SUCCESS:
      return state.mergeDeep({
        entities: action.data.entities.category,
        result: Object.getOwnPropertyNames(action.data.entities.category),
      });

    case FETCH_CATEGORY_LIST_SUCCESS:
      return state.mergeDeep({
        entities: action.data.entities.category,
        result: action.data.result,
        isFetched: true,
      });

    default:
      return state;
  }
};

export default categories;
