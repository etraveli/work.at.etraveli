import * as types from '../constants/actionTypes';

const initialState = {
  error: null,
  email: '',
  bookingNumber: '',
  isAuthenticated: false
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
    case types.LOGIN_FAILURE:
    case types.LOGIN_INPUT:
    case types.LOGOUT_SUCCESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
