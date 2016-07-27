import { FETCH_BLOG_SUCCESS, FETCH_ALL_BLOG_SUCCESS } from '../constants/blog'
import { Map } from 'immutable';

const tag = (state = Map({entities: {}}), action = {}) => {
  switch (action.type) {
    case FETCH_BLOG_SUCCESS:
      return state.mergeDeep({
        entities: action.data.entities.tag
      });

    case FETCH_ALL_BLOG_SUCCESS:
      return state.mergeDeep({
        entities: action.data.entities.tag,
        list: Object.getOwnPropertyNames(action.data.entities.tag),
        isFetched: true
      });

    default:
      return state;
  }
};

export default tag;
