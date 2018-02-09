import crypto from 'crypto-browserify';
import { Left, Right } from '../utils/generalUtils';
import _encryption from '../utils/encryption';

const encryption = _encryption(crypto);

const defaultConfig = {
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json'
  }
};

const successfulResponse = response =>
  response.status >= 200 && response.status < 300;

const eitherSuccessOrFail = response =>
  successfulResponse(response) ? Right(response) : Left(response);

const handleError = response => {
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  throw error;
};

const checkStatus = response =>
  eitherSuccessOrFail(response).fold(
    () => handleError(response),
    () => response
  );

const parseJSON = response => response.json();

export const login = (email, bookingNumber) =>
  fetch(
    '/login',
    Object.assign({}, defaultConfig, {
      method: 'POST',
      body: JSON.stringify({
        email,
        bookingNumber: encryption.encrypt(email, bookingNumber)
      })
    })
  )
    .then(checkStatus)
    .then(parseJSON);

export const register = email =>
  fetch(
    '/register',
    Object.assign({}, defaultConfig, {
      method: 'POST',
      body: JSON.stringify({
        email
      })
    })
  )
    .then(checkStatus)
    .then(parseJSON);
