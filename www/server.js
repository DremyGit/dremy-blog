import path from 'path';
import Express from 'express';
import React from 'react';
import configureStore from './stores';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server'
import { Map } from 'immutable';
import { syncHistoryWithStore } from 'react-router-redux'
import { match, RouterContext, createMemoryHistory } from 'react-router'
import routes from './constants/routes'
import proxy from 'http-proxy-middleware';

import Html from './helpers/Html';



const app = Express();
const port = 3000;
app.use('/api', proxy({
  target: 'http://localhost:5760',
  pathRewrite: {
    '^/api': ''
  }
}));
// 每当收到请求时都会触发
//app.use('/static', Express.static(path.join(__dirname, 'dist')));
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
      // You can also check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.
      //res.status(200).send(renderToString(<RouterContext {...renderProps} />))

      //console.log(new Date);
      // 创建新的 Redux store 实例
      //const store = configureStore();

      // 把组件渲染成字符串
      const component = (
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      //// 从 store 中获得初始 state
      //const initialState = store.getState();
      //
      //// 把渲染后的页面内容发送给客户端
      //res.headers = {
      //  'Content-Type': 'text/html'
      //};
      //res.send(renderFullPage(html, initialState));
      res.send('<!doctype html>\n' +
        renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>).replace(/ data-reactid="(.*?)"/g, ''));
    } else {
      res.status(404).send('Not found')
    }





  })
}


function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

app.listen(port, function () {
  console.log('server', port);
});
