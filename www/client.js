import 'babel-polyfill';
import 'isomorphic-fetch';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { fromJS } from 'immutable';
import ReactGA from 'react-ga';
import configureStore from './stores';
import routes from './constants/routes';
import DevTools from './containers/ReduxDevTools.js';
import config from './config';

// 通过服务端注入的全局变量得到初始 state
const initialState = fromJS(window.__INITIAL_STATE__);

// 使用初始 state 创建 Redux store
const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: state => state.get('routing') || {},
});

ReactGA.initialize(config.googleAnalyticsGA, {
  debug: __DEVELOPMENT__,
  titleCase: false,
});

ReactGA.set({ page: window.location.pathname });
ReactGA.pageview(window.location.pathname);
history.listen((location) => {
  setTimeout(() => {
    if (location.action === 'POP') {
      return;
    }
    window.scrollTo(0, 0);
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  });
});

render(
  <Provider store={store}>
    <div>
      <Router
        history={history}
        routes={routes}
      />
      { __DEVELOPMENT__ ? <DevTools /> : null}
    </div>
  </Provider>,
  document.getElementById('app'),
);
