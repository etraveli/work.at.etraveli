import React from 'react';
import { shallow } from 'enzyme';
import loginPage from '../loginPage';
import LoginForm from '../../components/loginForm';
import * as myTripAPI from '../../services/myTripAPI';

jest.mock('../../services/myTripAPI');

describe('LoginPageContainer', () => {
  it('enhances a LoginPage component with rpc call to post the login form to', () => {
    // noinspection JSAnnotator
    myTripAPI.login = jest.fn(() => new Promise(() => {}));
    const email = 'email';
    const bookingNumber = 'bookingNumber';
    const LoginPage = loginPage(LoginForm);
    const component = shallow(<LoginPage />);

    component
      .find(LoginForm)
      .props()
      .onLogin(email, bookingNumber);

    expect(myTripAPI.login).toHaveBeenCalledWith(email, bookingNumber);
  });
});
