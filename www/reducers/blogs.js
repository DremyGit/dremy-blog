import { OrderedMap, Map } from 'immutable'
import {
  FETCH_BLOG_LIST_FETCHING,
  FETCH_BLOG_LIST_SUCCESS,
  FETCH_BLOG_LIST_FAIL
} from '../constants/blog'

const initState = Map({
  loading: false,
  loaded: false,
  data: OrderedMap({}),
  error: null
});


const blogs = (state = initState, action = {}) => {
  switch (action.type) {
    case FETCH_BLOG_LIST_FETCHING:
      console.log('FETCH_BLOG_LIST');
      return state.set('loading', true);
      //return {
      //  ...state,
      //  loading: true
      //};
    case FETCH_BLOG_LIST_SUCCESS:
      return state.mergeDeep({
        loading: false,
        loaded: true,
        loaded_at: Date.now(),
        data: action.data.entities.blogs,
        error: null
      });
      //return {
      //  ...state,
      //  loading: false,
      //  loaded: true,
      //  loaded_at: Date.now(),
      //  data: action.data.entities.blogs,
      //  error: null
      //};
    case FETCH_BLOG_LIST_FAIL:
      return state.merge({
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      });
      //return {
      //  ...state,
      //  loading: false,
      //  loaded: false,
      //  data: null,
      //  error: action.error
      //};
    default:
      return state;
  }
};
export default blogs