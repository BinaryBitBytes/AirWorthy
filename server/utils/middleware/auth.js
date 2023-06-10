import jwt from 'jsonwebtoken'
// set token secret and expiration date
// const secret = 'secret1'
// const expiration = '2h'
// Middleware to verify that the JSON Web Token & Authentication of the user occur
export const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization
  // Checking to see if the token is valid and exists
  if (!token) {
    return res.status(401).json({ error: 'Authentication is required, a JWT is needed. Please provide JWT.' })
  }

  try {
    // Verifying the token is valid per the method
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    // Binding the authorized user to the request of the object
    req.user = decode.user
    next()
  } catch (err) {
    // Handling the error on mis-validation of the JWT token
    return res.status(401).json({ error: 'Authentication FAILED: Invalid Token' })
  }
}

// !----Example of auth middleware----j
// const authMiddleware = expressjwt({
//    secret: config.JWT_SECRET,
//    credentialsRequired: false,
//  })

// module.exports = {
//   //  authMiddleware: async function(req, res) {
//   authMiddleware: function ({ req }) {
//     // allows token to be sent via  req.query or headers
//     let token = req.query.token || req.query.token || req.headers.authorization

//     // ["Bearer", "<tokenvalue>"]
//     if (req.headers.authorization) {
//       token = token.split(' ').pop().trim()
//     }

//     if (!token) {
//       // return res.status(400).json({ message: 'You have no token!' });
//       return req
//     }

//     // verify token and get user data out of it
//     // !try {
//     //   const { data } = verify(token, secret, { maxAge: expiration });
//     //   req.user = data;
//     // } catch {
//     //   console.log('Invalid token');
//     //   return res.status(400).json({ message: 'invalid token!' });
//     //! }
//     try {
//       const { data } = jwt.verify(token, secret, { maxAge: expiration })
//       req.user = data
//     } catch {
//       console.log('Invalid token')
//     }

//     return req
//   },
//   // export function signToken({ email, username, _id }) {// ! uncommented to test module conflict
//   signToken: async function ({ email, username, _id }) {
//     const payload = { email, username, email, _id }

//     return jwt.sign({ data: payload }, secret, { expiresIn: expiration })
//   }
// }

// // module.exports = ({authMiddleware})
