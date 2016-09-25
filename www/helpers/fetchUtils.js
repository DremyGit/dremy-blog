import 'isomorphic-fetch';
import HttpError from 'some-http-error';
import config from '../config';

export const getData = (url) => {
  return myFetch(url).then(res => {
    if (res.status !== 200) {
      return res.json().then(body => {
        if (res.status >= 400 && res.status <= 405) {
          throw new HttpError(body.statusCode, body.message);
        }
        throw new Error(body);
      });
    }
    return res.json();
  })
};

export const myFetch = (url, obj) => {
  var basePath;
  if (__SERVER__) {
    basePath = config.apiProxyUrl;
  }
  if (__CLIENT__) {
    basePath = config.apiWebUrl;
  }
  return fetch(`${basePath}${url}`, obj)
};

export const dispatchDatas = (dispatch, components, params) => {
  const fetchs = components.filter(components => !!components.fetchData)
    .map(component => component.fetchData);
  return Promise.all(fetchs.map(f => dispatch(f(params))))
};

export const dispatchFetches = (dispatch, components, params) => {
  const fetches = components
    .filter(component => !!component.fetches)
    .reduce((prev, next) => prev.concat(next.fetches), [])
    .filter((value, index, self) => self.indexOf(value) === index);
  return Promise.all(fetches.map(f => dispatch(f(params))));
};

export const dispatchFetch = (fetches, props) => {
  fetches.forEach(f => props.dispatch(f(props.params)));
};

export const dispatchData = (f, props) => {
  return props.dispatch(f(props.params))
};