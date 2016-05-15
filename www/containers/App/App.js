import React from 'react';
import { syncHistoryWithStore} from 'react-router-redux'
import { createStore, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { createHistory } from 'history';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import configureStore from '../../stores';
import DevTools from '../dev/ReduxDevTools.js';
import Layout from './../Layout/Layout';
import Blogs from './../Blogs/Blogs';
import Blog from '../Blog/Blog';
import TagPage from './../Tag/TagPage';
import ArchivePage from './../Archive/ArchivePage';
import CategoryPage from './../Category/CategoryPage';
import AboutPage from './../About/AboutPage';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Router history={history}>
          <Route path="/" component={Layout}>
            <IndexRoute component={Blogs} />
            <Route path="blog" component={Blogs}/>
            <Route path="blog/:blogName" component={Blog}/>
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
