import React from 'react';
import { shallow } from 'enzyme';
import SignupConfirm from '../signupConfirm';

const setup = (
  email = 'hello@world.foo',
  bookingNumber = '123BAR',
  handleSubmit = () => {}
) => {
  const props = {
    email,
    bookingNumber,
    handleSubmit
  };
  return shallow(<SignupConfirm {...props} />);
};

describe('<SignupForm />', () => {
  it('renders a form', () => {
    const component = setup();
    expect(component.find('form').length).toBe(1);
  });

  it('contains email', () => {
    const regexp = new RegExp(/name@email.foo/);
    const component = setup('name@email.foo');
    const str = component.find('p').map(p => p.text())[0];
    expect(str.match(regexp)[0]).toBe('name@email.foo');
  });

  it('contains bookingNumber', () => {
    const regexp = new RegExp(/123ABC/);
    const component = setup('name@email.foo', '123ABC');
    const str = component.find('p').map(p => p.text())[0];
    expect(str.match(regexp)[0]).toBe('123ABC');
  });

  it('renders a submit button', () => {
    const component = setup();
    expect(component.find('button').prop('type')).toBe('submit');
  });

  describe('onSubmit', () => {
    it('should call handleSubmit prop', () => {
      const mockHandleSubmitProp = jest.fn();
      const component = setup('', '', mockHandleSubmitProp);
      component.find('form').simulate('submit');
      expect(mockHandleSubmitProp).toHaveBeenCalledTimes(1);
    });
  });
});
