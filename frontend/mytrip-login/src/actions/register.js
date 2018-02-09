import * as types from '../constants/actionTypes';
import * as myTripAPI from '../services/myTripAPI';

export const signupInput = (key, value) => ({
  type: types.SIGNUP_INPUT,
  payload: { [key]: value }
});

export const signup = email => dispatch => {
  myTripAPI
    .register(email)
    .then(data =>
      dispatch({
        type: types.SIGNUP_SUCCESS,
        payload: { data }
      })
    )
    .catch(e =>
      dispatch({
        type: types.SIGNUP_FAILURE,
        payload: {
          error: { message: 'Failed to register, please try again', raw: e }
        }
      })
    );
};
