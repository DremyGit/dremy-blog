import { normalize, arrayOf } from 'normalizr';
import {
  FETCH_CATEGORY_LIST_FETCHING,
  FETCH_CATEGORY_LIST_SUCCESS,
} from '../constants/category';
import { categorySchema } from '../reducers/schema';
import { getData } from '../helpers/fetchUtils';

function fetchCategoryListFetching() {
  return {
    type: FETCH_CATEGORY_LIST_FETCHING,
  };
}

function fetchCategoryListSuccess(data) {
  return {
    type: FETCH_CATEGORY_LIST_SUCCESS,
    data,
  };
}

function shouldFetchCategoryList(state) {
  return !state.getIn(['category', 'isFetched']);
}

export const fetchCategoryListIfNeed = () => {
  return (dispatch, getState) => {
    if (shouldFetchCategoryList(getState())) {
      dispatch(fetchCategoryListFetching());
      return getData('/categories').then((data) => {
        data = normalize(data, arrayOf(categorySchema));
        return dispatch(fetchCategoryListSuccess(data));
      });
    } else {
      return Promise.resolve();
    }
  };
};
