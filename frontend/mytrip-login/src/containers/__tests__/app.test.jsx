import React from 'react';
import { shallow } from 'enzyme';
import { Link, Match, Miss } from 'react-router';
import { App } from '../app';
import HomePage from '../../components/homePage';
import NoPageFoundPage from '../../components/noPageFoundPage';
import * as authUtil from '../../utils/authUtil';

jest.mock('../../utils/authUtil');

describe('<App/>', () => {
  it('renders a link to the home page', () => {
    const component = shallow(<App />);
    expect(component.contains(<Link to="/">Home</Link>)).toBe(true);
  });

  it('matches component to url /', () => {
    const component = shallow(<App />);
    expect(
      component.contains(<Match exactly pattern="/" component={HomePage} />)
    ).toBe(true);
  });

  describe('when user is not authenticated', () => {
    beforeEach(() => {
      // noinspection JSAnnotator
      authUtil.isAuthenticated = jest.fn(() => false);
    });

    it('renders a link to the login page', () => {
      const component = shallow(<App />);
      expect(component.contains(<Link to="/login">Login</Link>)).toBe(true);
    });

    it('matches component to url /login', () => {
      const component = shallow(<App />);
      const matchPatterns = [];
      component
        .find(Match)
        .forEach(match => matchPatterns.push(match.prop('pattern')));
      const loginPattern = matchPatterns.find(pattern => pattern === '/login');
      expect(loginPattern).toBeDefined();
    });

    it('does not render a link to the MyTrip page', () => {
      const component = shallow(<App />);
      expect(component.contains(<Link to="/mytrip">MyTrip</Link>)).toBe(false);
    });

    it('does not render a link to logout', () => {
      const component = shallow(<App />);
      const linkPaths = [];
      component.find(Link).forEach(link => linkPaths.push(link.prop('to')));
      const logoutLink = linkPaths.find(path => path === '/logout');
      expect(logoutLink).toBe(undefined);
    });
  });

  describe('when user is authenticated', () => {
    beforeEach(() => {
      // noinspection JSAnnotator
      authUtil.isAuthenticated = jest.fn(() => true);
    });

    it('does not render a link to the login page', () => {
      const component = shallow(<App />);
      expect(component.contains(<Link to="/login">Login</Link>)).toBe(false);
    });

    it('renders a link to the MyTrip page', () => {
      const component = shallow(<App />);
      expect(component.contains(<Link to="/mytrip">MyTrip</Link>)).toBe(true);
    });

    it('matches component to url /mytrip', () => {
      const component = shallow(<App />);
      const matchPatterns = [];
      component
        .find(Match)
        .forEach(match => matchPatterns.push(match.prop('pattern')));
      const loginPattern = matchPatterns.find(pattern => pattern === '/mytrip');
      expect(loginPattern).toBeDefined();
    });

    it('renders a link to logout', () => {
      const component = shallow(<App />);
      const linkPaths = [];
      component.find(Link).forEach(link => linkPaths.push(link.prop('to')));
      const logoutLink = linkPaths.find(path => path === '/logout');
      expect(logoutLink).toBeDefined();
    });

    it('matches component to url /logout', () => {
      const component = shallow(<App />);
      const matchPatterns = [];
      component
        .find(Match)
        .forEach(match => matchPatterns.push(match.prop('pattern')));
      const loginPattern = matchPatterns.find(pattern => pattern === '/logout');
      expect(loginPattern).toBeDefined();
    });

    describe('when user clicks logout', () => {
      beforeEach(() => {
        // noinspection JSAnnotator
        authUtil.clearSession = jest.fn();
      });

      it('clears the session', () => {
        const component = shallow(<App />);
        component.find(Link).forEach(link => {
          if (link.prop('to') === '/logout') {
            link.simulate('click');
          }
        });
        expect(authUtil.clearSession).toHaveBeenCalled();
      });
    });
  });

  describe('when url does not match an existing page', () => {
    it('renders an appropriate page', () => {
      const component = shallow(<App />);
      expect(component.contains(<Miss component={NoPageFoundPage} />)).toBe(
        true
      );
    });
  });
});
