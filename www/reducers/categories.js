import { FETCH_BLOG_LIST_SUCCESS } from '../constants/blog'

const categories = (state = {}, action = {}) => {
  switch (action.type) {
    case FETCH_BLOG_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        loaded_at: Date.now(),
        data: action.data.entities.categories,
        error: null
      };

    default:
      return state;
  }
};

export default categories;
