import * as pkg from "jsonwebtoken";
import jwt from "jsonwebtoken";
const { verify, sign } = pkg;
const secret = "mysecretsshhhhh";
const expiration = "2h";

const signToken = async function ({ email, username, _id }) {
  const payload = { email, username, email, _id };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};
console.log(typeof signToken);
signToken({
  email: "example@email.com",
  username: "exampleUser",
  _id: "someId",
});
console.log(signToken);
console.log(
  signToken({
    email: "test@email.com",
    username: "test",
    _id: "test",
  })
);
