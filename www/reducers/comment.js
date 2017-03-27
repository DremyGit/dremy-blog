import { fromJS } from 'immutable';
import { FETCH_COMMENT_SUCCESS, SUBMIT_COMMENT_SUCCESS } from '../constants/comment';

const tag = (state = fromJS({}), action = {}) => {
  let tempState;
  let commentList;
  let rootId;
  switch (action.type) {

    case FETCH_COMMENT_SUCCESS:
      return state.mergeDeep({
        entities: action.data.entities.comment,
        blog: {
          [action.blog]: action.data.result,
        },
      });

    case SUBMIT_COMMENT_SUCCESS:
      tempState = state.mergeDeep({
        entities: action.data.entities.comment,
      });
      rootId = action.data.entities.comment[action.data.result].root_id;
      if (rootId) {
        return tempState.setIn(['entities', rootId, 'replies'],
          tempState.getIn(['entities', rootId, 'replies']).push(action.data.result));
      }
      commentList = state.getIn(['blog', action.blog]) || fromJS([]);
      return tempState.mergeDeep({
        blog: {
          [action.blog]: commentList.push(action.data.result),
        },
      });

    default:
      return state;
  }
};

export default tag;
