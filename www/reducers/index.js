import { combineReducers } from 'redux-immutable';
import routing from './routing';
import blog from './blog';
import tag from './tag';
import category from './category';
import comment from './comment';

export default combineReducers({
  routing,
  blog,
  tag,
  category,
  comment,
});
