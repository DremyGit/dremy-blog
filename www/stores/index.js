import thunkMiddleware from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import reducer from '../reducers';
import DevTools from '../containers/ReduxDevTools';

export default function configureStore(initialState) {
  const store = compose(
    applyMiddleware(thunkMiddleware),
    DevTools.instrument(),
  )(createStore)(reducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers/blog.js', () => {
      const nextRootReducer = require('../reducers/blog.js');
      store.replaceReducer(nextRootReducer);
    });
    module.hot.accept('../reducers/tag.js', () => {
      const nextRootReducer = require('../reducers/tag.js');
      store.replaceReducer(nextRootReducer);
    });
    module.hot.accept('../reducers/category.js', () => {
      const nextRootReducer = require('../reducers/category.js');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
