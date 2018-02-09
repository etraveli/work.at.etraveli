import React from 'react';
import PropTypes from 'prop-types';

const SignupForm = ({ email, handleSubmit, handleInput }) => (
  <form onSubmit={handleSubmit} className="mytrip-content__login-form">
    <div className="mytrip-content__login-form-row">
      <label htmlFor="email">Email:</label>
      <input
        className="mytrip-content__login-form-input-field"
        name="email"
        type="text"
        value={email}
        onChange={handleInput}
      />
    </div>
    <div className="mytrip-content__login-form-row">
      <button type="submit">Login</button>
    </div>
  </form>
);

SignupForm.propTypes = {
  email: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired
};

export default SignupForm;
