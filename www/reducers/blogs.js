import { OrderedMap, Map } from 'immutable'
import { FETCH_BLOG_SUCCESS, FETCH_ALL_BLOG_SUCCESS } from '../constants/blog'

const blogs = (state = Map(), action = {}) => {
  switch (action.type) {
    case FETCH_BLOG_SUCCESS:
    case FETCH_ALL_BLOG_SUCCESS:
      return state.mergeDeep(action.data.entities.blogs);
    default:
      return state;
  }
};
export default blogs