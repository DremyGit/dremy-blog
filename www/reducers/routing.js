import Immutable from 'immutable';

import {
  LOCATION_CHANGE,
  routerReducer
} from 'react-router-redux';

const initialState = Immutable.fromJS({
  locationBeforeTransitions: null
});

export default (state = initialState, action) => {
  if (action.type === LOCATION_CHANGE) {
    return routerReducer(state, action)
  }
  return state;
};
