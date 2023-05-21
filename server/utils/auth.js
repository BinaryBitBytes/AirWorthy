// import { verify, sign } from 'jsonwebtoken';
import pkg from 'jsonwebtoken';
import { expressjwt, ExpressJwtRequest } from "express-jwt"
const { verify, sign } = pkg;
// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';
//!----Example of auth middleware----j
// const authMiddleware = expressjwt({
//   secret: config.JWT_SECRET,
//   credentialsRequired: false,
// })

// export function authMiddleware(req, res) { //! uncommented to test module conflict
  export async function authMiddleware(req, res) {
  // allows token to be sent via  req.query or headers
  let token = req.query.token || req.headers.authorization;

  // ["Bearer", "<tokenvalue>"]
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return res.status(400).json({ message: 'You have no token!' });
  }

  // verify token and get user data out of it
  try {
    const { data } = verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
    console.log('Invalid token');
    return res.status(400).json({ message: 'invalid token!' });
  }
}
// export function signToken({ email, username, _id }) {//! uncommented to test module conflict
  export async function signToken({ email, username, _id }) {
  const payload = { email, username, email, _id };

  return sign({ data: payload }, secret, { expiresIn: expiration });
}
export default {authMiddleware,signToken};