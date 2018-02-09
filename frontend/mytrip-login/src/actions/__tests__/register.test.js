import * as actions from '../register';
import * as types from '../../constants/actionTypes.js';

describe('register', () => {
  it.skip('signup', () => {});

  it('signupInput', () => {
    const expected = {
      type: types.SIGNUP_INPUT,
      payload: { email: 'jazzy@jeff.com' }
    };
    expect(actions.signupInput('email', 'jazzy@jeff.com')).toEqual(expected);
  });
});
