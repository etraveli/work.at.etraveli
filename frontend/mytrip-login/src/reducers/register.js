import * as types from '../constants/actionTypes';

const initialState = {
  email: '',
  bookingNumber: '',
  error: null
};

export default function register(state = initialState, action) {
  switch (action.type) {
    case types.SIGNUP_SUCCESS:
    case types.SIGNUP_FAILURE:
    case types.SIGNUP_INPUT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
