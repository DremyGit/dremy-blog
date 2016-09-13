import { FETCH_COMMENT_FETCHING, FETCH_COMMENT_SUCCESS, SUBMIT_COMMENT_SUCCESS } from '../constants/comment'
import { fromJS } from 'immutable';

const tag = (state = fromJS({}), action = {}) => {
  switch (action.type) {

    case FETCH_COMMENT_SUCCESS:
      return state.mergeDeep({
        entities: action.data.entities.comment,
        blog: {
          [action.blog]: action.data.result
        }
      });

    case SUBMIT_COMMENT_SUCCESS:
      return state.mergeDeep({
        entities: action.data.entities.comment,
        blog: {
          [action.blog]: action.data.result
        }
      });

    default:
      return state;
  }
};

export default tag;