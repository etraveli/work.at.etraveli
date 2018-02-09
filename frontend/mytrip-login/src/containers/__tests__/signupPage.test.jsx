import React from 'react';
import { shallow } from 'enzyme';
import { SignupPage } from '../signupPage';
import SignupForm from '../../components/signupForm';
import SignupConfirm from '../../components/signupConfirm';

const setup = (
  email = '',
  bookingNumber = '',
  signup = () => {},
  signupInput = () => {},
  login = () => {}
) => {
  const props = { email, bookingNumber, signup, signupInput, login };
  return shallow(<SignupPage {...props} />);
};

describe('<SignupPage />', () => {
  it('should render the <SignupForm /> if email and booking props are empty', () => {
    const component = setup();
    expect(component.find(SignupForm).exists()).toBe(true);
  });

  it('should render the <SignupConfirm /> if has email and booking', () => {
    const component = setup('name@email.com', '123ABC');
    expect(component.find(SignupConfirm).exists()).toBe(true);
  });

  describe('method handleFormInputChange', () => {
    it('should call signupInput prop with name and value from event target', () => {
      const mockSignupInputProp = jest.fn();
      const mockEvent = { target: { name: 'email', value: 'ace@frehley.xxx' } };
      const component = setup('', '', () => {}, mockSignupInputProp);
      component.instance().handleFormInputChange(mockEvent);
      expect(mockSignupInputProp).toHaveBeenCalledWith(
        'email',
        'ace@frehley.xxx'
      );
    });
  });

  describe('method handleFormSignupSubmit', () => {
    it('should prevent event default', () => {
      const mockEvent = { preventDefault: jest.fn() };
      const component = setup();
      component.instance().handleFormSignupSubmit(mockEvent);
      expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
    });

    it('should call signup with email prop', () => {
      const mockSignupProp = jest.fn();
      const mockEvent = { preventDefault: jest.fn() };
      const component = setup('name@email.com', '', mockSignupProp);
      component.instance().handleFormSignupSubmit(mockEvent);
      expect(mockSignupProp).toHaveBeenCalledWith('name@email.com');
    });
  });

  describe('method handleFormLoginSubmit', () => {
    it('should prevent event default', () => {
      const mockEvent = { preventDefault: jest.fn() };
      const component = setup();
      component.instance().handleFormLoginSubmit(mockEvent);
      expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
    });

    it('should call login with email and bookingNumber props', () => {
      const mockLoginProp = jest.fn();
      const mockEvent = { preventDefault: jest.fn() };
      const component = setup(
        'name@email.com',
        '123456',
        () => {},
        () => {},
        mockLoginProp
      );
      component.instance().handleFormLoginSubmit(mockEvent);
      expect(mockLoginProp).toHaveBeenCalledWith('name@email.com', '123456');
    });
  });
});
