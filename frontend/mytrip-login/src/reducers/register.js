import * as types from '../constants/actionTypes';

const initialState = {
  email: '',
  error: null
};

export default function register(state = initialState, action) {
  switch (action.type) {
    case types.SIGNUP_SUCCESS:
      return { ...state, ...action.payload };
    case types.SIGNUP_FAILURE:
      return { ...state, ...action.payload };
    case types.SIGNUP_INPUT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
