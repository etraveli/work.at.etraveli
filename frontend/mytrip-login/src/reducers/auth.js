import * as types from '../constants/actionTypes';

const initialState = {
  error: null,
  email: '',
  bookingNumber: '',
  isAuthenticated: false
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return state;
    case types.LOGIN_SUCCESS:
      return state;
    case types.LOGIN_FAILURE:
      return state;
    default:
      return state;
  }
}
