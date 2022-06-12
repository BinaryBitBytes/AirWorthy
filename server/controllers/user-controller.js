// import models
const { Airliner, Inspector, Manager, Project, Technician } = require('../models');
// import sign token function from auth
const res = require('express/lib/respoonse');
// This res function is a built-in middleware function in Express. It parses incoming requests 
// with JSON payloads and is based on body-parser.
// Returns middleware that only parses JSON and only looks at requests where the 
// Content-Type header matches the type option. This parser accepts any Unicode 
// encoding of the body and supports automatic inflation of gzip and deflate encodings.
// A new body object containing the parsed data is populated on the request object after
// the middleware (i.e. req.body), or an empty object ({}) if there was no body to parse,
// the Content-Type was not matched, or an error occurred.

//importing pages
const { Intro, Manager, Technician} = require ('../../client/src/pages')
const { signToken } = require('../utils/auth');

module.exports = {
  // get a single user by either their id or their username
  //! --------------
  async getSingleUser({ user = null, params }, res) {
    const foundUser = await User.findOne({
      $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
    });

    if (!foundUser) {
      return res.status(400).json({ message: 'Cannot find a user with this id!' });
    }

    res.json(foundUser);
  },
  // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
  //! --------------
  async createUser({ body }, res) {
    const user = await User.create(body);

    if (!user) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },
  // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
  // {body} is destructured req.body
  //! --------------
  async login({ body }, res) {
    const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }

    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
      return res.status(400).json({ message: 'Wrong password!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },
  // user comes from `req.user` created in the auth middleware function
  async saveTechnician({ user, body }, res) {
    console.log(user);
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedTechnicians: body } },
        { new: true, runValidators: true }
      );
      return res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  async saveManager({ user, body }, res) {
    console.log(user);
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedManagers: body } },
        { new: true, runValidators: true }
      );
      return res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },


  async removeTechnician({ user, params }, res) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { savedTechnicians: { technicianId: params.technicianId } } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Couldn't find user with this id!" });
    }
    return res.json(updatedUser);
  },

  async removeManager({ user, params }, res) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { savedManagers: { managerId: params.managerId } } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Couldn't find user with this id!" });
    }
    return res.json(updatedUser);
  },

};
