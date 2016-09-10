import 'babel-polyfill';
import 'isomorphic-fetch';

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { fromJS } from 'immutable';
import configureStore from './stores';
import routes from './constants/routes'
import DevTools from './containers/ReduxDevTools.js';
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, browserHistory } from 'react-router';
import { dispatchFetches } from './helpers/fetchUtils';

// 通过服务端注入的全局变量得到初始 state
const initialState = fromJS(window.__INITIAL_STATE__);

// 使用初始 state 创建 Redux store
const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.get('routing').toJS()
});
let lastKey;

history.listen(location => {
  setTimeout(() => {
    if (location.action === 'POP') {
      return;
    }
    var hash = window.location.hash;
    if (hash) {
      var element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({block: 'start', behavior: 'smooth'});
      }
    } else if (lastKey !== location.key) {
      window.scrollTo(0, 0);
      lastKey = location.key;
    }
  });
});

render(
  <Provider store={store}>
    <div>
      <Router
        history={history}
        routes={routes}
      />
      { __DEVTOOLS__ ? <DevTools /> : null}
    </div>
  </Provider>,
  document.getElementById('app')
);
