import thunkMiddleware from 'redux-thunk'
import { createHistory } from 'history';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import reducer from '../reducers';
import DevTools from '../containers/ReduxDevTools';



export default function configureStore(initialState) {
  const store = compose(
    applyMiddleware(thunkMiddleware),
    DevTools.instrument()
  )(createStore)(reducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers/blogs.js', () => {
      const nextRootReducer = require('../reducers/blogs.js');
      store.replaceReducer(nextRootReducer)
    });
    module.hot.accept('../reducers/tags.js', () => {
      const nextRootReducer = require('../reducers/tags.js');
      store.replaceReducer(nextRootReducer)
    })
    module.hot.accept('../reducers/categories.js', () => {
      const nextRootReducer = require('../reducers/categories.js');
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}