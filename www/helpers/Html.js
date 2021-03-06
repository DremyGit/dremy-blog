import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
import Helmet from 'react-helmet';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    store: PropTypes.object,
  };

  render() {
    const { assets, component, store } = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    const head = Helmet.rewind();
    const assetsPathArr = (assets.javascript.bundle || assets.javascript.main).split('/');
    assetsPathArr.pop();
    const assetsPath = assetsPathArr.join('/');
    return (
      <html lang="zh-CN">
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {Object.keys(assets.styles).map((style, key) =>
            <link
              href={assets.styles[style]} key={key} media="screen, projection"
              rel="stylesheet" type="text/css" charSet="UTF-8"
            />,
        )}
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
          <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${JSON.stringify(store.getState())};` }} charSet="UTF-8" />
          <script src={`${assetsPath}/highlight.pack.js`} />
          { !__DEVELOPMENT__ ? <script>hljs.initHighlighting()</script> : null }
          <script src={assets.javascript.bundle || assets.javascript.main} charSet="UTF-8" />
        </body>
      </html>
    );
  }
}
