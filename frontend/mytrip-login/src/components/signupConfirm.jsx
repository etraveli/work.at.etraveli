import React from 'react';
import PropTypes from 'prop-types';

const SignupConfirm = ({ email, bookingNumber, handleSubmit }) => (
  <section>
    <h2>Yey! You're now registered</h2>
    <p>
      You signed up with {email} and your booking number is {bookingNumber}
    </p>
    <p>You can now login with your new credentials below.</p>
    <form onSubmit={handleSubmit} className="mytrip-content__login-form">
      <div className="mytrip-content__signup-form-row">
        <button type="submit">Login</button>
      </div>
    </form>
  </section>
);

SignupConfirm.propTypes = {
  email: PropTypes.string.isRequired,
  bookingNumber: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default SignupConfirm;
