import React from 'react';
import { shallow } from 'enzyme';
import NoPageFoundPage from '../noPageFoundPage';

describe('<NoPageFoundPage />', () => {
  it('renders a section with content', () => {
    const component = shallow(<NoPageFoundPage />);
    const section = component.find('section');
    expect(section.length).toBe(1);
    expect(section.text()).toBe('404 - This is not the page you are looking for!');
  });
});
