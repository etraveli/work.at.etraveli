import reducer from '../auth';
import * as types from '../../constants/actionTypes';

describe('auth reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      error: null,
      email: '',
      bookingNumber: '',
      isAuthenticated: false
    });
  });
  it('should handle LOGIN_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: types.LOGIN_SUCCESS,
        payload: {
          error: null,
          isAuthenticated: true
        }
      })
    ).toEqual({
      error: null,
      email: '',
      bookingNumber: '',
      isAuthenticated: true
    });
  });
  it('should handle LOGIN_FAILURE', () => {
    expect(
      reducer(undefined, {
        type: types.LOGIN_FAILURE,
        payload: {
          error: { message: 'Undefined of undefined' },
          isAuthenticated: false
        }
      })
    ).toEqual({
      error: { message: 'Undefined of undefined' },
      email: '',
      bookingNumber: '',
      isAuthenticated: false
    });
  });
  it('should handle LOGIN_INPUT with email', () => {
    expect(
      reducer(undefined, {
        type: types.LOGIN_INPUT,
        payload: {
          email: 'hello@world.com'
        }
      })
    ).toEqual({
      error: null,
      email: 'hello@world.com',
      bookingNumber: '',
      isAuthenticated: false
    });
  });

  it('should handle LOGIN_INPUT with bookingNumber', () => {
    expect(
      reducer(undefined, {
        type: types.LOGIN_INPUT,
        payload: {
          bookingNumber: '123456'
        }
      })
    ).toEqual({
      error: null,
      email: '',
      bookingNumber: '123456',
      isAuthenticated: false
    });
  });

  it('should handle LOGOUT_SUCCES', () => {
    expect(
      reducer(undefined, {
        type: types.LOGOUT_SUCCESS,
        payload: {
          isAuthenticated: false
        }
      })
    ).toEqual({
      error: null,
      email: '',
      bookingNumber: '',
      isAuthenticated: false
    });
  });
});
