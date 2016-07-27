import { OrderedMap, Map } from 'immutable'
import { FETCH_BLOG_SUCCESS, FETCH_ALL_BLOG_SUCCESS } from '../constants/blog'

const blog = (state = Map(), action = {}) => {
  switch (action.type) {
    case FETCH_BLOG_SUCCESS:
      return state.mergeDeep({
        entities: action.data.entities.blog
      });

    case FETCH_ALL_BLOG_SUCCESS:
      return state.mergeDeep({
        entities: action.data.entities.blog,
        isFetched: true,
        list: action.data.result
      });
    default:
      return state;
  }
};
export default blog