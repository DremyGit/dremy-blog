import { Map } from 'immutable';
import { FETCH_BLOG_SUCCESS, FETCH_ALL_BLOG_SUCCESS } from '../constants/blog';
import { FETCH_TAG_LIST_SUCCESS } from '../constants/tag';

const tag = (state = Map(), action = {}) => {
  switch (action.type) {
    case FETCH_BLOG_SUCCESS:
      return state.mergeDeep({
        entities: action.data.entities.tag,
      });

    case FETCH_ALL_BLOG_SUCCESS:
      return state.mergeDeep({
        entities: action.data.entities.tag,
        result: Object.getOwnPropertyNames(action.data.entities.tag),
      });

    case FETCH_TAG_LIST_SUCCESS:
      return state.mergeDeep({
        entities: action.data.entities.tag,
        result: action.data.result,
        isFetched: true,
      });

    default:
      return state;
  }
};

export default tag;
