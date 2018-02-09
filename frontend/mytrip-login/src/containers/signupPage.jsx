import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signup, signupInput } from '../actions/register';
import { login } from '../actions/auth';
import SignupForm from '../components/signupForm';
import SignupConfirm from '../components/signupConfirm';

export class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.handleFormSignupSubmit = this.handleFormSignupSubmit.bind(this);
    this.handleFormLoginSubmit = this.handleFormLoginSubmit.bind(this);
  }

  handleFormInputChange(e) {
    const { name: key, value } = e.target;
    this.props.signupInput(key, value);
  }

  handleFormSignupSubmit(e) {
    e.preventDefault();
    const { email } = this.props;
    this.props.signup(email);
  }

  handleFormLoginSubmit(e) {
    e.preventDefault();
    const { email, bookingNumber } = this.props;
    this.props.login(email, bookingNumber);
  }

  render() {
    const { email, bookingNumber, error } = this.props;
    return (
      <div>
        {email && bookingNumber ? (
          <SignupConfirm
            email={email}
            bookingNumber={bookingNumber}
            handleSubmit={this.handleFormLoginSubmit}
          />
        ) : (
          <SignupForm
            email={email}
            handleInput={this.handleFormInputChange}
            handleSubmit={this.handleFormSignupSubmit}
            errorMsg={error && error.message ? error.message : null}
          />
        )}
      </div>
    );
  }
}

SignupPage.propTypes = {
  email: PropTypes.string.isRequired,
  bookingNumber: PropTypes.string.isRequired,
  signup: PropTypes.func.isRequired,
  signupInput: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  error: PropTypes.object
};

const mapStateToProps = state => ({
  error: state.register.error,
  email: state.register.email,
  bookingNumber: state.register.bookingNumber
});

const mapDispatchToProps = {
  signup,
  signupInput,
  login
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
