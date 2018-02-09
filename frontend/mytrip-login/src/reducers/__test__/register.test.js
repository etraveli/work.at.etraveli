import reducer from '../register';
import * as types from '../../constants/actionTypes';

describe('register reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      error: null,
      email: '',
      bookingNumber: ''
    });
  });

  it('should handle SIGNUP_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: types.SIGNUP_SUCCESS,
        payload: { email: 'hello@there.nu', bookingNumber: '123ABC' }
      })
    ).toEqual({
      error: null,
      email: 'hello@there.nu',
      bookingNumber: '123ABC'
    });
  });

  it('should handle SIGNUP_FAILURE', () => {
    expect(
      reducer(undefined, {
        type: types.SIGNUP_FAILURE,
        payload: {
          error: { message: 'Undefined of undefined' }
        }
      })
    ).toEqual({
      error: { message: 'Undefined of undefined' },
      email: '',
      bookingNumber: ''
    });
  });
  it('should handle SIGNUP_INPUT with email', () => {
    expect(
      reducer(undefined, {
        type: types.SIGNUP_INPUT,
        payload: {
          email: 'hello@world.com'
        }
      })
    ).toEqual({
      error: null,
      email: 'hello@world.com',
      bookingNumber: ''
    });
  });
});
