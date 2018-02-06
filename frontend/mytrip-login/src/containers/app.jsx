import React, { Component } from 'react';
import { BrowserRouter, Link, Match, Miss, Redirect } from 'react-router';
import HomePage from '../components/homePage';
import LoginForm from '../components/loginForm';
import loginPage from './loginPage';
import MyTripPage from '../components/myTripPage';
import NoPageFoundPage from '../components/noPageFoundPage';
import { isAuthenticated, clearSession } from '../utils/authUtil';
import { Left, Right } from '../utils/generalUtils';

const pageDecider = isAuthorized =>
  isAuthorized ? Right(isAuthorized) : Left(isAuthorized);

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: isAuthenticated()
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin(success) {
    this.setState({ isAuthenticated: success });
  }

  handleLogout() {
    clearSession();
    this.setState({ isAuthenticated: false });
  }

  render() {
    const LoginPage = loginPage(LoginForm);
    return (
      <BrowserRouter>
        <div>
          <nav className="mytrip-navbar">
            <ul className="mytrip-navbar__items">
              <li>
                <Link to="/">Home</Link>
              </li>
              {!this.state.isAuthenticated && (
                <li>
                  <Link to="/login">Login</Link>
                </li>
              )}
              {this.state.isAuthenticated && (
                <li>
                  <Link to="/mytrip">MyTrip</Link>
                </li>
              )}
              {this.state.isAuthenticated && (
                <li>
                  <Link to="/logout" onClick={this.handleLogout}>
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
                pageDecider(isAuthenticated()).fold(
                  () => <LoginPage onLogin={this.handleLogin} />,
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
                pageDecider(isAuthenticated()).fold(
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
