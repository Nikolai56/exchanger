import { ActionTypes } from '../actions';

const initialState = {
  data: undefined,
  isLoading: false,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.REQUESTED_RATES:
    return {
      ...state,
      isLoading: true,
      error: false,
    };
  case ActionTypes.REQUESTED_RATES_SUCCEEDED:
    return {
      data: action.data,
      isLoading: false,
      error: false,
    };
  case ActionTypes.REQUESTED_RATES_FAILED:
    return {
      ...state,
      isLoading: false,
      error: true,
    };
  default:
    return state;
  }
};

export default reducer;
