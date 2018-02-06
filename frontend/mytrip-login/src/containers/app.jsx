import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Link, Match, Miss, Redirect } from 'react-router';
import { logout } from '../actions';
import LoginPage from './loginPage';
import HomePage from '../components/homePage';
import MyTripPage from '../components/myTripPage';
import NoPageFoundPage from '../components/noPageFoundPage';
import { isAuthenticated, clearSession } from '../utils/authUtil';
import { Left, Right } from '../utils/generalUtils';

const pageDecider = isAuthorized =>
  isAuthorized ? Right(isAuthorized) : Left(isAuthorized);

export class App extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     isAuthenticated: isAuthenticated()
  //   };

  //   this.handleLogin = this.handleLogin.bind(this);
  //   this.handleLogout = this.handleLogout.bind(this);
  // }

  // handleLogin(success) {
  //   this.setState({ isAuthenticated: success });
  // }

  // handleLogout() {
  //   clearSession();
  //   this.setState({ isAuthenticated: false });
  // }

  render() {
    return (
      <BrowserRouter>
        <div>
          <nav className="mytrip-navbar">
            <ul className="mytrip-navbar__items">
              <li>
                <Link to="/">Home</Link>
              </li>
              {!this.props.isAuthenticated && (
                <li>
                  <Link to="/login">Login</Link>
                </li>
              )}
              {this.props.isAuthenticated && (
                <li>
                  <Link to="/mytrip">MyTrip</Link>
                </li>
              )}
              {this.props.isAuthenticated && (
                <li>
                  <Link to="/logout" onClick={this.props.logout}>
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </nav>
          <section className="mytrip-content">
            <Match exactly pattern="/" component={HomePage} />
            <Match
              pattern="/login"
              render={props =>
                pageDecider(this.props.isAuthenticated).fold(
                  () => <LoginPage />,
                  () => (
                    <Redirect
                      to={{
                        pathname: '/mytrip',
                        state: { from: props.location }
                      }}
                    />
                  )
                )
              }
            />
            <Match
              pattern="/logout"
              render={props => (
                <Redirect
                  {...props}
                  to={{
                    pathname: '/login',
                    state: { from: props.location }
                  }}
                />
              )}
            />
            <Match
              pattern="/mytrip"
              render={props =>
                pageDecider(this.props.isAuthenticated).fold(
                  () => (
                    <Redirect
                      to={{
                        pathname: '/login',
                        state: { from: props.location }
                      }}
                    />
                  ),
                  () => <MyTripPage />
                )
              }
            />

            <Miss component={NoPageFoundPage} />
          </section>
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
