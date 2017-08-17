import React, { Component } from 'react';
import { eitherFunctionOrNot } from '../utils/generalUtils';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      bookingNumber: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleBookingNumberChange = this.handleBookingNumberChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const onLogin = this.props.onLogin;
    eitherFunctionOrNot(onLogin)
      .fold(
        () => {},
        () => onLogin(this.state.email, this.state.bookingNumber)
      );
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handleBookingNumberChange(event) {
    this.setState({ bookingNumber: event.target.value });
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="mytrip-content__login-form"
      >
        <div className="mytrip-content__login-form-row">
          <label htmlFor="email">Email:</label>
          <input
            className="mytrip-content__login-form-input-field"
            name="email"
            type="text"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
        </div>
        <div className="mytrip-content__login-form-row">
          <label htmlFor="bookingNumber">Booking number:</label>
          <input
            className="mytrip-content__login-form-input-field"
            name="bookingNumber"
            type="password"
            value={this.state.bookingNumber}
            onChange={this.handleBookingNumberChange}
          />
        </div>
        <div className="mytrip-content__login-form-row">
          <button type="submit">
            Login
          </button>
        </div>
      </form>
    );
  }
}
