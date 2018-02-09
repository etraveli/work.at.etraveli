const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Left = require('../../src/utils/generalUtils').Left;
const Right = require('../../src/utils/generalUtils').Right;
const encryption = require('../../src/utils/encryption')(crypto);

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

const generateBookingNumber = email => {
  try {
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const NUMS = '0123456789';
    const bookingNumber = new Array(6)
      .map(
        i =>
          i < 4
            ? NUMS.charAt(Math.floor(Math.random() * NUMS.lenght))
            : CHARS.charAt(Math.floor(Math.random() * CHARS.lenght))
      )
      .join('');
    console.log(bookingNumber);
    return Right({ email, bookingNumber });
  } catch (e) {
    return Left('Unable to generate new booking number');
  }
};

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
    generateBookingNumber(email).fold(
      message => response.status(400).json({ message }),
      ({ email, bookingNumber }) =>
        response.status(200).json({ email, bookingNumber })
    );
  }
};
