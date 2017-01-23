# My Trip - Login

After purchasing a plane ticket the customer wants to be able to have a place to go in order to find information about 
the upcoming trip. This place is called **MyTrip page**, and is the page where a customer can go to see things like
departure and arrival dates, what airline they travel with, etc. 

## Problem description

The trip information should not be available for the entire world to see, and is thus protected with authentication. 
A customer needs to sign in with an email address and a booking number to be able to access the information. The 
objective of this assignment is to improve the login functionality, so it is not necessary to add any content on the
actual pages.

There is existing functionality to be able to login as a customer, however this functionality was written a long time
ago, in a galaxy far away. So the state management for the login page is managed inside the React component. And some
other functionality is missing.

## Get started

The code in this repo is generated using [create-react-app](https://github.com/facebookincubator/create-react-app),
and [express application generator](https://expressjs.com/en/starter/generator.html).

In order to run the application with [yarn](https://yarnpkg.com/) run the commands:

```bash
$ yarn install
```

```bash
$ yarn run start
```

To run the tests run the command:

```bash
$ yarn run test
```

Or if you prefer to use [npm](https://www.npmjs.com/) run the commands:

```bash
$ npm install
```

```bash
$ npm run start
```

And to run the tests:

```bash
$ npm run test
```

### Notes

There is no database implemented, in order to simulate an invalid login use the email `invalid`.

### Tasks

1. When a failed login attempt is made, display an error text somewhere in the form.
2. There currently is no way of creating a new booking. Implement a new page where it is possible to generate a new
customer and booking number (much like a signup form).
3. The booking number is currently sent in clear text to the server, implement a solution so that it is encrypted
before it is posted.
4. You should refactor so that state is managed with [Redux](http://redux.js.org/) instead of internally in [React](https://facebook.github.io/react/).
