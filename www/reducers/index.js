import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import blogs from './blogs';

export default combineReducers({
  routing: routerReducer,
  blogs
});
