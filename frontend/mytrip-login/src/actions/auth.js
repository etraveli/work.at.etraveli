import * as types from '../constants/actionTypes';
import { persistJWT, isAuthenticated, clearSession } from '../utils/authUtil';
import * as myTripAPI from '../services/myTripAPI';

export const hasJWT = () => dispatch =>
  isAuthenticated()
    ? dispatch({
        type: types.LOGIN_SUCCESS,
        payload: { isAuthenticated: true }
      })
    : dispatch({
        type: types.LOGIN_FAILURE,
        payload: { isAuthenticated: false }
      });

export const loginInput = (key, value) => ({
  type: types.LOGIN_INPUT,
  payload: { [key]: value }
});

export const login = (email, bookingNumber) => dispatch => {
  myTripAPI
    .login(email, bookingNumber)
    .then(persistJWT)
    .then(() =>
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: { error: null, isAuthenticated: true }
      })
    )
    .catch(e =>
      dispatch({
        type: types.LOGIN_FAILURE,
        payload: {
          error: { message: 'Wrong email or booking number', raw: e },
          isAuthenticated: false
        }
      })
    );
};

export const logout = () => {
  clearSession();
  return {
    type: types.LOGOUT_SUCCESS,
    payload: {
      error: null,
      isAuthenticated: false,
      email: '',
      bookingNumber: ''
    }
  };
};

export const signupInput = (key, value) => ({
  type: types.SIGNUP_INPUT,
  payload: { [key]: value }
});
