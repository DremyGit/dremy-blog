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
      const state1 = state.mergeDeep({
        entities: action.data.entities.comment
      });
      const root_id = action.data.entities.comment[action.data.result].root_id;
      console.log(root_id);
      if (root_id) {
        //return state1.mergeDeepIn(['entities', root_id], {replies: [action.data.result]});
        return state1.setIn(['entities', root_id, 'replies'],
          state1.getIn(['entities', root_id, 'replies']).push(action.data.result));
      }
      const list = state.getIn(['blog', action.blog]) || fromJS([]);
      return state1.mergeDeep({
        blog: {
          [action.blog]: list.push(action.data.result)
        }
      });

    default:
      return state;
  }
};

export default tag;