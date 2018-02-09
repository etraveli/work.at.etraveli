import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../auth';
import * as types from '../../constants/actionTypes.js';
import * as myTripAPI from '../../services/myTripAPI';
import * as authUtil from '../../utils/authUtil';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../utils/authUtil');
jest.mock('../../services/myTripAPI');

describe('auth', () => {
  it('hasJWt dispatches correct action when localStorage has jwt key', () => {
    authUtil.isAuthenticated = jest.fn(() => true);

    const store = mockStore();
    const expectedActions = [
      {
        type: types.LOGIN_SUCCESS,
        payload: { isAuthenticated: true }
      }
    ];
    store.dispatch(actions.hasJWT());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('login dispatches correct action when myTripAPI.login resolves', () => {
    myTripAPI.login = jest.fn(
      () => new Promise((resolve, reject) => resolve())
    );

    const store = mockStore();
    const expectedActions = [
      {
        type: types.LOGIN_SUCCESS,
        payload: { error: null, isAuthenticated: true }
      }
    ];

    return store.dispatch(actions.login()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('login dispatches correct action when myTripAPI.login rejects', () => {
    myTripAPI.login = jest.fn(() => new Promise((resolve, reject) => reject()));

    const store = mockStore();
    const expectedActions = [
      {
        type: types.LOGIN_FAILURE,
        payload: {
          error: { message: 'Wrong email or booking number' },
          isAuthenticated: false
        }
      }
    ];

    return store.dispatch(actions.login()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

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
