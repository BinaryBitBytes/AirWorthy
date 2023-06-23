// import { verify, sign } from 'jsonwebtoken';
// import pkg from 'jsonwebtoken';
// const { jwt, verify, sign } = pkg;
import jwt from 'jsonwebtoken';
// import jwt from 'jsonwebtoken';
// import { expressjwt } from"express-jwt";
// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';
//!----Example of auth middleware----j
// const authMiddleware = expressjwt({
//    secret: config.JWT_SECRET,
//    credentialsRequired: false,
//  })

module.exports = {
  //  authMiddleware: async function(req, res) {
    authMiddleware: function ({ req }) {
    // allows token to be sent via  req.query or headers
    let token = req.query.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      // return res.status(400).json({ message: 'You have no token!' });
      return req;
    }

    // verify token and get user data out of it
    // !try {
    //   const { data } = verify(token, secret, { maxAge: expiration });
    //   req.user = data;
    // } catch {
    //   console.log('Invalid token');
    //   return res.status(400).json({ message: 'invalid token!' });
    //! }
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
// export function signToken({ email, username, _id }) {//! uncommented to test module conflict
signToken: async function ({ email, username, _id }) {
  const payload = { email, username, email, _id };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

}

// module.exports = ({authMiddleware})
