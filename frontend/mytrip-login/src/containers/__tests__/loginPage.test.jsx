import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../loginPage';
import LoginForm from '../../components/loginForm';

const setup = (
  email = '',
  bookingNumber = '',
  login = () => {},
  loginInput = () => {}
) => {
  const props = { email, bookingNumber, login, loginInput };
  return shallow(<LoginPage {...props} />);
};

describe('<LoginPage />', () => {
  it('should render the <LoginForm />', () => {
    const component = setup();
    expect(component.find(LoginForm).exists()).toBe(true);
  });

  describe('method handleFormInputChange', () => {
    it('should call loginInput prop with name and value from event target', () => {
      const mockLoginInputProp = jest.fn();
      const mockEvent = { target: { name: 'email', value: 'ace@frehley.xxx' } };
      const component = setup('', '', () => {}, mockLoginInputProp);
      component.instance().handleFormInputChange(mockEvent);
      expect(mockLoginInputProp).toHaveBeenCalledWith(
        'email',
        'ace@frehley.xxx'
      );
    });
  });
  describe('method handleFormSubmit', () => {
    it('should prevent event default', () => {
      const mockEvent = { preventDefault: jest.fn() };
      const component = setup();
      component.instance().handleFormSubmit(mockEvent);
      expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
    });

    it('should call login with email and bookingNumber props', () => {
      const mockLoginProp = jest.fn();
      const mockEvent = { preventDefault: jest.fn() };
      const component = setup('name@email.com', '123456', mockLoginProp);
      component.instance().handleFormSubmit(mockEvent);
      expect(mockLoginProp).toHaveBeenCalledWith('name@email.com', '123456');
    });
  });
});
