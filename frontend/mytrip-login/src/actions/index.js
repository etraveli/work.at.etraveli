import * as types from '../constants/actionTypes';

export const loginInput = e => ({
  type: types.LOGIN_INPUT,
  payload: { [e.target.name]: e.target.value }
});
