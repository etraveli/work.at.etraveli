import React from 'react';
import { shallow } from 'enzyme';
import SignupForm from '../signupForm';

const setup = (email = '', handleInput = () => {}, handleSubmit = () => {}) => {
  const props = {
    email,
    handleInput,
    handleSubmit
  };
  return shallow(<SignupForm {...props} />);
};

describe('<SignupForm />', () => {
  it('renders a form', () => {
    const component = setup();
    expect(component.find('form').length).toBe(1);
  });

  it('renders an input field for email', () => {
    const component = setup();
    const names = [];
    component.find('input').forEach(i => names.push(i.prop('name')));
    expect(names.find(name => name === 'email')).toBeDefined();
  });

  it('renders a submit button', () => {
    const component = setup();
    expect(component.find('button').prop('type')).toBe('submit');
  });

  describe('onChange', () => {
    it('should call handleInput prop', () => {
      const mockHandleInputProp = jest.fn();
      const component = setup('', mockHandleInputProp);
      component.find('input[name="email"]').simulate('change');
      expect(mockHandleInputProp).toHaveBeenCalledTimes(1);
    });
  });

  describe('onSubmit', () => {
    it('should call handleSubmit prop', () => {
      const mockHandleSubmitProp = jest.fn();
      const component = setup('', () => {}, mockHandleSubmitProp);
      component.find('form').simulate('submit');
      expect(mockHandleSubmitProp).toHaveBeenCalledTimes(1);
    });
  });
});
