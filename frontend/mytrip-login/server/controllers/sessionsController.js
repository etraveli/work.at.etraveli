const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const encryption = require('../../src/utils/encryption')(crypto);
const {
  Left,
  Right,
  Sum,
  compose,
  curry,
  callTimes,
  charAt,
  randomInRange
} = require('../../src/utils/generalUtils');

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMS = '0123456789';
const secret = 'HowardHughes';

const createHmac = data =>
  crypto
    .createHmac('sha256', secret)
    .update(data)
    .digest('hex');

const createToken = data => jwt.sign({ data }, createHmac(data));

const isEmpty = str => str === '' || str === undefined || str === null;

const authenticateCustomer = (email, bookingNumber) =>
  email === 'invalid' || isEmpty(email) || isEmpty(bookingNumber)
    ? Left('Unauthorized login attempt')
    : Right(createToken(email));

// To simple email check for simplicity
const validateEmail = email => {
  const regex = new RegExp(/@/);
  return email.match(regex) ? Right(email) : Left('Invalid email');
};

const randomChar = compose(curry(charAt)(CHARS), randomInRange);
const randomNumber = compose(curry(charAt)(NUMS), randomInRange);

const generateBookingNumber = () =>
  Sum.of('')
    .concat(Sum.of(callTimes('', () => randomNumber(NUMS), 3)))
    .concat(Sum.of(callTimes('', () => randomChar(CHARS), 3)));

module.exports = {
  create(request, response) {
    const { email, bookingNumber } = request.body;
    const decryptedBookingNumber = encryption.decrypt(email, bookingNumber);
    authenticateCustomer(email, decryptedBookingNumber).fold(
      message => response.status(401).json({ message }),
      token => {
        response.status(200).json({ jwt: token });
      }
    );
  },
  register(request, response) {
    const { email } = request.body;
    validateEmail(email).fold(
      message => response.status(400).json({ message }),
      email =>
        response.status(200).json({
          email,
          bookingNumber: generateBookingNumber().fold(n =>
            encryption.encrypt(email, n)
          )
        })
    );
  }
};
