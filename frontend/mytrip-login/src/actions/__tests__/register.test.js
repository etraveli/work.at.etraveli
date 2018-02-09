import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../register';
import * as types from '../../constants/actionTypes.js';
import * as myTripAPI from '../../services/myTripAPI';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../utils/authUtil');
jest.mock('../../services/myTripAPI');

describe('register', () => {
  it('signup dispatches correct action when myTripAPI.signup resolves', () => {
    myTripAPI.signup = jest.fn(
      () =>
        new Promise((resolve, reject) =>
          resolve({ email: 'morgan@ullared.se', bookingNumber: '666XXX' })
        )
    );

    const store = mockStore();
    const expectedActions = [
      {
        type: types.SIGNUP_SUCCESS,
        payload: { email: 'morgan@ullared.se', bookingNumber: '666XXX' }
      }
    ];

    return store.dispatch(actions.signup()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('signup dispatches correct action when myTripAPI.login rejects', () => {
    myTripAPI.signup = jest.fn(
      () =>
        new Promise((resolve, reject) =>
          reject({
            message: 'Failed to register, be sure to enter a vaild email'
          })
        )
    );

    const store = mockStore();
    const expectedActions = [
      {
        type: types.SIGNUP_FAILURE,
        payload: {
          error: {
            message: 'Failed to register, be sure to enter a vaild email'
          }
        }
      }
    ];

    return store.dispatch(actions.signup()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('signupInput', () => {
    const expected = {
      type: types.SIGNUP_INPUT,
      payload: { email: 'jazzy@jeff.com' }
    };
    expect(actions.signupInput('email', 'jazzy@jeff.com')).toEqual(expected);
  });
});
