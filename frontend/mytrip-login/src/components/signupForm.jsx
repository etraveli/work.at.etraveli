import React from 'react';
import PropTypes from 'prop-types';

const SignupForm = ({ email, handleSubmit, handleInput, errorMsg }) => (
  <form onSubmit={handleSubmit} className="mytrip-content__login-form">
    {errorMsg ? (
      <div className="mytrip-content__signup-form-row">
        <div className="mytrip-content__signup-form-message mytrip-content__signup-form-message--error">
          {errorMsg}
        </div>
      </div>
    ) : (
      ''
    )}
    <div className="mytrip-content__signup-form-row">
      <label htmlFor="email">Email:</label>
      <input
        className="mytrip-content__signup-form-input-field"
        name="email"
        type="text"
        value={email}
        onChange={handleInput}
      />
    </div>
    <div className="mytrip-content__signup-form-row">
      <button type="submit">Signup</button>
    </div>
  </form>
);

SignupForm.propTypes = {
  email: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  errorMsg: PropTypes.string
};

export default SignupForm;
