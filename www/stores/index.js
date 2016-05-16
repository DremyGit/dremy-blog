import thunkMiddleware from 'redux-thunk'
import { createHistory } from 'history';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import reducer from '../reducers';
import DevTools from '../containers/dev/ReduxDevTools';



export default function configureStore(initialState) {
  const store = compose(
    applyMiddleware(thunkMiddleware),
    DevTools.instrument()
  )(createStore)(reducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers/blog.js', () => {
      const nextRootReducer = require('../reducers/blogs.js');
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}