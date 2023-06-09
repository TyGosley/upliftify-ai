const jwt = require('jsonwebtoken');
require('dotenv').config();


const secret = process.env.SECRET_KEY;
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
    if (!token) {
      return req;
    }
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch (error) {
      console.log('Invalid token');
    }
    return req;
  },
  
  signToken: function ({ email, username, password, _id }) {
    const payload = { email, username, password, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
