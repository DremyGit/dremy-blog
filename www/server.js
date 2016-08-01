import path from 'path';
import Express from 'express';
import React from 'react';
import configureStore from './stores';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server'
import proxy from 'http-proxy-middleware';
import { Map } from 'immutable';
import { syncHistoryWithStore } from 'react-router-redux'
import { match, RouterContext, createMemoryHistory } from 'react-router'
import routes from './constants/routes'
import { dispatchFetches } from './helpers/fetchUtils';
import config from './config';

import Html from './helpers/Html';

const app = Express();
const port = config.serverPort;
app.use('/api', proxy({
  target: config.apiProxyUrl,
  pathRewrite: {
    '^/api': ''
  }
}));
app.use(config.staticPath, Express.static(path.join(__dirname, 'dist')));
app.use(handleRender);

function handleRender(req, res) {

  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }

  const memoryHistory = createMemoryHistory(req.path);
  const store = configureStore(Map({}));
  const history = syncHistoryWithStore(memoryHistory, store, {
    selectLocationState: (state) => state.get('routing').toJS()
  });

  match({ history, routes }, (error, redirectLocation, renderProps) => {


    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      dispatchFetches(store.dispatch, renderProps.components, renderProps.params).then(() => {
        const component = (
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
        res.send('<!doctype html>\n' +
          renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>)
            .replace(/ data-reactid="(.*?)"/g, '')
            .replace(/<!--\s*\/?react.*?-->/g, '')
        );
      }).catch(err => {
        console.error(err);
        if (__DEVELOPMENT__) {
          return res.status(500).send(`<pre>${err.stack}</pre>`);
        }
        return res.status(500).send('故障中,待修复...');
      });
    } else {
      res.status(404).send('Not found')
    }
  })
}

app.listen(port, function () {
  console.info('Express server running on %d', port);
});
