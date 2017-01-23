import React from 'react';
import { shallow } from 'enzyme';
import loginPageWithRPC from '../loginPageWithRPC';
import LoginPage from '../../components/loginPage';
import * as myTripAPI from '../../services/myTripAPI';

jest.mock('../../services/myTripAPI');

describe('LoginPageContainer', () => {
  it('enhances a LoginPage component with rpc call to post the login form to', () => {
    //noinspection JSAnnotator
    myTripAPI.login = jest.fn(() => new Promise(() => {}));
    const email = 'email';
    const bookingNumber = 'bookingNumber';
    const LoginPageWithRPC = loginPageWithRPC(LoginPage);
    const component = shallow(<LoginPageWithRPC />);

    component.find(LoginPage).props().onLogin(email, bookingNumber);

    expect(myTripAPI.login).toHaveBeenCalledWith(email, bookingNumber);
  });
});
