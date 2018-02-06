import * as actions from '../';
import * as types from '../../constants/actionTypes.js';

describe('Auth actions', () => {
  it('should create action to update auth email', () => {
    const expected = {
      type: types.LOGIN_INPUT,
      payload: { email: 'fresh@prince.com' }
    };
    expect(actions.loginInput('email', 'fresh@prince.com')).toEqual(expected);
  });
});
