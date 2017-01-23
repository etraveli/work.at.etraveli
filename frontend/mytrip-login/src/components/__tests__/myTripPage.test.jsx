import React from 'react';
import { shallow } from 'enzyme';
import MyTripPage from '../myTripPage';

describe('<MyTripPage />', () => {
  it('renders a section with content', () => {
    const component = shallow(<MyTripPage />);
    const section = component.find('section');
    expect(section.length).toBe(1);
    expect(section.text()).toBe('MyTrip');
  });
});
