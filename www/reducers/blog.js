import { Map } from 'immutable';
import { FETCH_BLOG_SUCCESS, FETCH_ALL_BLOG_SUCCESS } from '../constants/blog';
import { FETCH_COMMENT_SUCCESS } from '../constants/comment';

const blog = (state = Map(), action = {}) => {
  switch (action.type) {
    case FETCH_BLOG_SUCCESS:
      return state.mergeDeep({
        entities: action.data.entities.blog,
      });

    case FETCH_ALL_BLOG_SUCCESS:
      return state.mergeDeep({
        entities: action.data.entities.blog,
        isFetched: true,
        list: action.data.result,
      });

    case FETCH_COMMENT_SUCCESS:
      return state.setIn(['entities', action.blog, 'isCommentFetched'], true);

    default:
      return state;
  }
};
export default blog;
