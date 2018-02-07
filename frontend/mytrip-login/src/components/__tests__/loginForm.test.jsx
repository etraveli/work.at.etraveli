import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from '../loginForm';

const setup = (
  email = '',
  bookingNumber = '',
  handleInput = () => {},
  handleSubmit = () => {}
) => {
  const props = {
    email,
    bookingNumber,
    handleInput,
    handleSubmit
  };
  return shallow(<LoginForm {...props} />);
};

describe('<LoginForm />', () => {
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

  it('renders an input field for booking number', () => {
    const component = setup();
    const names = [];
    component.find('input').forEach(i => names.push(i.prop('name')));
    expect(names.find(name => name === 'bookingNumber')).toBeDefined();
  });

  it('sets type password on bookingNumber field', () => {
    const component = setup();
    const types = [];
    component.find('input').forEach(i => types.push(i.prop('type')));
    expect(types.find(type => type === 'password')).toBeDefined();
  });

  it('renders a submit button', () => {
    const component = setup();
    expect(component.find('button').prop('type')).toBe('submit');
  });

  describe('onChange', () => {
    it('should call handleInput prop', () => {
      const mockHandleInputProp = jest.fn();
      const component = setup('', '', mockHandleInputProp);
      component.find('input[name="email"]').simulate('change');
      component.find('input[name="bookingNumber"]').simulate('change');
      expect(mockHandleInputProp).toHaveBeenCalledTimes(2);
    });
  });

  describe('onSubmit', () => {
    it('should call handleSubmit prop', () => {
      const mockHandleSubmitProp = jest.fn();
      const component = setup('', '', () => {}, mockHandleSubmitProp);
      component.find('form').simulate('submit');
      expect(mockHandleSubmitProp).toHaveBeenCalledTimes(1);
    });
  });
});
