import React, { Component } from 'react';
import { eitherFunctionOrNot } from '../../utils/generalUtils';
import { isAuthenticated, markSessionAsAuthenticated } from '../utils/authUtil';
import * as myTripAPI from '../services/myTripAPI';

function persistJWT(data) {
  if (data.jwt !== null) {
    markSessionAsAuthenticated(data.jwt);
  }
  return data;
}

export default function loginPageWithRPC(LoginPage) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(email, bookingNumber) {
      const onLogin = this.props.onLogin;
      myTripAPI.login(email, bookingNumber)
        .then(persistJWT)
        .then(() =>
          eitherFunctionOrNot(onLogin)
            .fold(
              () => {},
              () => onLogin(isAuthenticated())
            )
        )
        .catch(e => console.error(e));
    }

    render() {
      return <LoginPage onLogin={this.handleLogin} />;
    }
  };
}
