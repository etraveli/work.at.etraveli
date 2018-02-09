import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signup, signupInput } from '../actions/register';
import SignupForm from '../components/signupForm';

export class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormInputChange(e) {
    const { name: key, value } = e.target;
    this.props.signupInput(key, value);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const { email } = this.props;
    this.props.signup(email);
  }

  render() {
    const { email } = this.props;
    return (
      <SignupForm
        email={email}
        handleInput={this.handleFormInputChange}
        handleSubmit={this.handleFormSubmit}
      />
    );
  }
}

SignupPage.propTypes = {
  email: PropTypes.string.isRequired,
  signup: PropTypes.func.isRequired,
  signupInput: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  error: state.register.error,
  email: state.register.email
});

const mapDispatchToProps = {
  signup,
  signupInput
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
