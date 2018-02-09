import * as types from '../constants/actionTypes';
import * as myTripAPI from '../services/myTripAPI';

export const signupInput = (key, value) => ({
  type: types.SIGNUP_INPUT,
  payload: { [key]: value }
});

export const signup = email => dispatch =>
  myTripAPI
    .signup(email)
    .then(({ email, bookingNumber }) =>
      dispatch({
        type: types.SIGNUP_SUCCESS,
        payload: { email, bookingNumber }
      })
    )
    .catch(e =>
      dispatch({
        type: types.SIGNUP_FAILURE,
        payload: {
          error: {
            message: 'Failed to register, be sure to enter a vaild email'
          }
        }
      })
    );
