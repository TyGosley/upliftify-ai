const jwt = require('jsonwebtoken');
require('dotenv').config();


const secret = process.env.SECRET_KEY;
const expiration = '2h';

module.exports = {
  signToken: function ({ email, username, password, _id }) {
    const payload = { email, username, password, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
