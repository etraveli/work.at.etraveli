import * as actions from '../auth';
import * as types from '../../constants/actionTypes.js';

jest.mock('../../utils/authUtil');

describe('auth', () => {
  it.skip('login', () => {});

  it('loginInput', () => {
    const expected = {
      type: types.LOGIN_INPUT,
      payload: { email: 'fresh@prince.com' }
    };
    expect(actions.loginInput('email', 'fresh@prince.com')).toEqual(expected);
  });

  it('logout', () => {
    const expected = {
      type: types.LOGOUT_SUCCESS,
      payload: {
        error: null,
        isAuthenticated: false,
        email: '',
        bookingNumber: ''
      }
    };
    expect(actions.logout()).toEqual(expected);
  });
});
