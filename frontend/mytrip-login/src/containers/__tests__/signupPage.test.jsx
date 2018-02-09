import React from 'react';
import { shallow } from 'enzyme';
import { SignupPage } from '../signupPage';
import SignupForm from '../../components/signupForm';

const setup = (email = '', signup = () => {}, signupInput = () => {}) => {
  const props = { email, signup, signupInput };
  return shallow(<SignupPage {...props} />);
};

describe('<SignupPage />', () => {
  it('should render the <SignupForm />', () => {
    const component = setup();
    expect(component.find(SignupForm).exists()).toBe(true);
  });

  describe('method handleFormInputChange', () => {
    it('should call signupInput prop with name and value from event target', () => {
      const mockSignupInputProp = jest.fn();
      const mockEvent = { target: { name: 'email', value: 'ace@frehley.xxx' } };
      const component = setup('', () => {}, mockSignupInputProp);
      component.instance().handleFormInputChange(mockEvent);
      expect(mockSignupInputProp).toHaveBeenCalledWith(
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

    it('should call signup with email and bookingNumber props', () => {
      const mockSignupProp = jest.fn();
      const mockEvent = { preventDefault: jest.fn() };
      const component = setup('name@email.com', mockSignupProp);
      component.instance().handleFormSubmit(mockEvent);
      expect(mockSignupProp).toHaveBeenCalledWith('name@email.com');
    });
  });
});
