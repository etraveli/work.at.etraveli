import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from '../loginForm';

const setup = (email = '', bookingNumber = '') => {
  const props = {
    email,
    bookingNumber,
    handleInput: () => {},
    handleSubmit: () => {}
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

  describe('onSubmit', () => {
    it.skip('triggers callback onLogin', () => {
      const handleLogin = jest.fn();
      const component = shallow(<LoginForm onLogin={handleLogin} />);
      const event = { preventDefault() {} };
      component.find('form').simulate('submit', event);
      expect(handleLogin).toHaveBeenCalledWith(
        component.state().email,
        component.state().bookingNumber
      );
    });
  });
});
