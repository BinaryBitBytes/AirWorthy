import * as pkg from "jsonwebtoken";
import jwt from "jsonwebtoken";
// import { expressjwt } from "express-jwt";
// const authMiddleware = expressjwt({
//    secret: config.JWT_SECRET,
//    credentialsRequired: false,
//  })
const { verify } = pkg;
// set token secret and expiration date
const secret = "mysecretsshhhhh";
const expiration = "2h";
//!----Example of auth middleware----j
//  authMiddleware: async function(req, res) {
const authMiddleware = function (req, res) {
  // allows token to be sent via  req.query or headers
  //! let token = req.query.token || req.headers.authorization;
  let token =
    (req.query && req.query.token) ||
    (req.headers && req.headers.authorization);
  // ["Bearer", "<tokenvalue>"]
  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    return res.status(400).json({ message: "You have no token!" });
    // return req;
  }

  // verify token and get user data out of it
  try {
    const { data } = verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
    console.log("Invalid token");
    return res.status(400).json({ message: "invalid token!" });
  }
  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
    console.log("Invalid token");
  }

  return req;
};
console.log(typeof authMiddleware);
const req = {};
const res = { status: (code) => ({ json: (message) => console.log(message) }) };
// authMiddleware(req, res);
// console.log(authMiddleware(req));

// export function signToken({ email, username, _id }) {//! uncommented to test module conflict

// module.exports = ({authMiddleware})
