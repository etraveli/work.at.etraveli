import React from 'react';
import { shallow } from 'enzyme';
import { Link, Match, Miss } from 'react-router';
import { App } from '../app';
import HomePage from '../../components/homePage';
import NoPageFoundPage from '../../components/noPageFoundPage';

const setup = (
  isAuthenticated = false,
  logout = () => {},
  hasJWT = () => {}
) => {
  const props = { isAuthenticated, logout, hasJWT };
  return shallow(<App {...props} />);
};

describe('<App/>', () => {
  it('renders a link to the home page', () => {
    const component = setup();
    expect(component.contains(<Link to="/">Home</Link>)).toBe(true);
  });

  it('matches component to url /', () => {
    const component = setup();
    expect(
      component.contains(<Match exactly pattern="/" component={HomePage} />)
    ).toBe(true);
  });

  describe('when user is not authenticated', () => {
    it('renders a link to the login page', () => {
      const component = setup();
      expect(component.contains(<Link to="/login">Login</Link>)).toBe(true);
    });

    it('matches component to url /login', () => {
      const component = setup();
      const matchPatterns = [];
      component
        .find(Match)
        .forEach(match => matchPatterns.push(match.prop('pattern')));
      const loginPattern = matchPatterns.find(pattern => pattern === '/login');
      expect(loginPattern).toBeDefined();
    });

    it('does not render a link to the MyTrip page', () => {
      const component = setup();
      expect(component.contains(<Link to="/mytrip">MyTrip</Link>)).toBe(false);
    });

    it('does not render a link to logout', () => {
      const component = setup();
      const linkPaths = [];
      component.find(Link).forEach(link => linkPaths.push(link.prop('to')));
      const logoutLink = linkPaths.find(path => path === '/logout');
      expect(logoutLink).toBe(undefined);
    });
  });

  describe('when user is authenticated', () => {
    it('does not render a link to the login page', () => {
      const component = setup(true);
      expect(component.contains(<Link to="/login">Login</Link>)).toBe(false);
    });

    it('renders a link to the MyTrip page', () => {
      const component = setup(true);
      expect(component.contains(<Link to="/mytrip">MyTrip</Link>)).toBe(true);
    });

    it('matches component to url /mytrip', () => {
      const component = setup(true);
      const matchPatterns = [];
      component
        .find(Match)
        .forEach(match => matchPatterns.push(match.prop('pattern')));
      const loginPattern = matchPatterns.find(pattern => pattern === '/mytrip');
      expect(loginPattern).toBeDefined();
    });

    it('renders a link to logout', () => {
      const component = setup(true);
      const linkPaths = [];
      component.find(Link).forEach(link => linkPaths.push(link.prop('to')));
      const logoutLink = linkPaths.find(path => path === '/logout');
      expect(logoutLink).toBeDefined();
    });

    it('matches component to url /logout', () => {
      const component = setup(true);
      const matchPatterns = [];
      component
        .find(Match)
        .forEach(match => matchPatterns.push(match.prop('pattern')));
      const loginPattern = matchPatterns.find(pattern => pattern === '/logout');
      expect(loginPattern).toBeDefined();
    });

    describe('when user clicks logout', () => {
      it('login prop should be called', () => {
        const mockLogoutProp = jest.fn();
        const component = setup(true, mockLogoutProp);
        component.find(Link).forEach(link => {
          if (link.prop('to') === '/logout') {
            link.simulate('click');
          }
        });
        expect(mockLogoutProp).toHaveBeenCalled();
      });
    });
  });

  describe('when url does not match an existing page', () => {
    it('renders an appropriate page', () => {
      const component = setup();
      expect(component.contains(<Miss component={NoPageFoundPage} />)).toBe(
        true
      );
    });
  });

  describe('when component did mount', () => {
    it('calls hasJWT prop', () => {
      const mockHasJWTProp = jest.fn();
      const component = setup(false, () => {}, mockHasJWTProp);
      component.instance().componentDidMount();
      expect(mockHasJWTProp).toHaveBeenCalledTimes(1);
    });
  });
});
