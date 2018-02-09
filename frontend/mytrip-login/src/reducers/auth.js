import * as types from '../constants/actionTypes';

const initialState = {
  error: null,
  email: '',
  bookingNumber: '',
  isAuthenticated: false
};

export default function auth(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return { ...state, ...action.payload };
    case types.LOGIN_FAILURE:
      return { ...state, ...action.payload };
    case types.LOGIN_INPUT:
      return { ...state, ...action.payload };
    case types.LOGOUT_SUCCESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
