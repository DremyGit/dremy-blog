import React from 'react';
//import {
//  ReduxRouter,
//  reduxReactRouter,
//  routerStateReducer
//} from 'redux-router';
import { syncHistoryWithStore} from 'react-router-redux'
import { createStore, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { createHistory } from 'history';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import configureStore from '../stores';
import DevTools from '../components/dev/ReduxDevTools.js';
import Layout from './../components/Layout';
import BlogPage from './BlogPage';
import TagPage from './TagPage';
import ArchivePage from './ArchivePage';
import CategoryPage from './CategoryPage';
import AboutPage from './AboutPage';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Router history={history}>
          <Route path="/" component={Layout}>
            <IndexRoute component={BlogPage} />
            <Route path="blog" component={BlogPage}/>
            <Route path="tag" component={TagPage}/>
            <Route path="category" component={CategoryPage}/>
            <Route path="archive" component={ArchivePage}/>
            <Route path="about" component={AboutPage}/>
          </Route>
        </Router>
        <DevTools />
      </div>
    </Provider>
  )
};

export default App;
