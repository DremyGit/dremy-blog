import { normalize, arrayOf } from 'normalizr';
import {
  FETCH_TAG_LIST_FETCHING,
  FETCH_TAG_LIST_SUCCESS,
} from '../constants/tag';
import { tagSchema } from '../reducers/schema';
import { getData } from '../helpers/fetchUtils';

function fetchTagListFetching() {
  return {
    type: FETCH_TAG_LIST_FETCHING,
  };
}

function fetchTagListSuccess(data) {
  return {
    type: FETCH_TAG_LIST_SUCCESS,
    data,
  };
}

function shouldFetchTagList(state) {
  return !state.getIn(['tag', 'isFetched']);
}

export const fetchTagListIfNeed = () => {
  return (dispatch, getState) => {
    if (shouldFetchTagList(getState())) {
      dispatch(fetchTagListFetching());
      return getData('/tags').then((data) => {
        data = normalize(data, arrayOf(tagSchema));
        return dispatch(fetchTagListSuccess(data));
      });
    } else {
      return Promise.resolve();
    }
  };
};
