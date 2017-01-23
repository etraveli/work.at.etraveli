import React from 'react';
import { shallow } from 'enzyme';
import HomePage from '../homePage';

describe('<HomePage/>', () => {
  it('renders a section with content', () => {
    const component = shallow(<HomePage />);
    const section = component.find('section');
    expect(section.length).toBe(1);
    expect(section.text()).toBe('Home');
  });
});
