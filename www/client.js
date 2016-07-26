import 'babel-polyfill';
import 'isomorphic-fetch';

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './stores';
import routes from './constants/routes'
import DevTools from './containers/ReduxDevTools.js';
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// 通过服务端注入的全局变量得到初始 state
const initialState = window.__INITIAL_STATE__;

// 使用初始 state 创建 Redux store
const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <div>
      <Router
        onUpdate={() => window.scrollTo(0, 0)}
        history={history}
        routes={routes}
      />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('app')
);
