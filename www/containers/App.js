import React from 'react';
import { syncHistoryWithStore} from 'react-router-redux'
import { createStore, compose, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import { createHistory } from 'history';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import configureStore from '../stores';
import DevTools from './ReduxDevTools.js';
import Layout from '../components/Layout/Layout';
import BlogsPage from './BlogsPage';
import BlogPage from './BlogPage';
import TagPage from './TagPage';
import ArchivePage from './ArchivePage';
import CategoryPage from './CategoryPage';
import AboutPage from './AboutPage';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
const routeConfig = [
  { path: '/',
    component: Layout,
    indexRoute: { component: BlogsPage },
    childRoutes: [
      {path: 'blog', component: BlogsPage },
      {path: 'blog/:blogName', component: BlogPage},
      {path: 'tag', component: TagPage },
      {path: 'category', component: CategoryPage },
      {path: 'archive', component: ArchivePage },
      {path: 'about', component: AboutPage }
    ]
  }
];

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Router
            onUpdate={() => window.scrollTo(0, 0)}
            history={history}
            routes={routeConfig}
          />
          <DevTools />
        </div>
      </Provider>
    )
  }
}
