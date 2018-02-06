import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login, loginInput } from '../actions';
import LoginForm from '../components/loginForm';

export class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormInputChange(e) {
    const { name: key, value } = e.target;
    this.props.loginInput(key, value);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const { email, bookingNumber } = this.props;
    this.props.login(email, bookingNumber);
  }

  render() {
    return (
      <LoginForm
        email={this.props.email}
        bookingNumber={this.props.bookingNumber}
        handleInput={this.handleFormInputChange}
        handleSubmit={this.handleFormSubmit}
      />
    );
  }
}

LoginPage.propTypes = {
  email: PropTypes.string.isRequired,
  bookingNumber: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  loginInput: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  error: state.auth.error,
  email: state.auth.email,
  bookingNumber: state.auth.bookingNumber
});

const mapDispatchToProps = {
  login,
  loginInput
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
