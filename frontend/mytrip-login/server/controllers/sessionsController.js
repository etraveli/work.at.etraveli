const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Left = require('../../utils/generalUtils').Left;
const Right = require('../../utils/generalUtils').Right;

const secret = 'HowardHughes';

const createHmac = data =>
  crypto
    .createHmac('sha256', secret)
    .update(data)
    .digest('hex');

const createToken = data =>
  jwt.sign({ data }, createHmac(data));

const isEmpty = str =>
  (str === '' || str === undefined || str === null);

const authenticateCustomer = (email, bookingNumber) =>
  (email === 'invalid' || isEmpty(email) || isEmpty(bookingNumber))
    ? Left('Unauthorized login attempt')
    : Right(createToken(email));

module.exports = {
  create(request, response) {
    const {
      email,
      bookingNumber,
    } = request.body;
    authenticateCustomer(email, bookingNumber)
      .fold(
        message => response.status(401).json({ message }),
        token => response.status(200).json({ jwt: token })
      );
  }
};
