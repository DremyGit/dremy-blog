import thunkMiddleware from 'redux-thunk'
import { createHistory } from 'history';
import { routerReducer } from 'react-router-redux'
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import blog from '../reducers/blog';
import DevTools from '../components/dev/ReduxDevTools';

const reducer = combineReducers({
  routing: routerReducer,
  blog: blog
});


export default function configureStore(initialState) {
  const store = compose(
    applyMiddleware(thunkMiddleware),
    DevTools.instrument()
  )(createStore)(reducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers/blog.js', () => {
      const nextRootReducer = require('../reducers/blog.js');
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}