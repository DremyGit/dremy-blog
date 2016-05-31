import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import blogs from './blogs';
import tags from './tags';
import categories from './categories';
import status from './status';

export default combineReducers({
  routing: routerReducer,
  blogs: blogs,
  tags: tags,
  categories: categories,
  status: status
});
