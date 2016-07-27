import { combineReducers } from 'redux-immutable';
//import { routerReducer } from 'react-router-redux'
import routing from './routing';
import blogs from './blogs';
import tags from './tags';
import categories from './categories';
import status from './status';
import pager from './pager'

export default combineReducers({
  //routing: routerReducer,
  routing,
  blogs,
  tags,
  categories,
  status,
  pager
});
