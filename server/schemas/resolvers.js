const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async (parent, {userId}) => {
      return await User.findOne(
        { $or: [{ _id: userId}, { username: username }] }
      ).populate('savedBooks');
    },
  },

  Mutation: {
    loginUser: async (parent,  { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Cannot find this user');
      }
  
      const correctPw = await user.isCorrectPassword(password);
  
      if (!correctPw) {
        throw new AuthenticationError('Wrong password!');
      }
      const token = signToken(user);
      return({ token, user });
    },
  
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
  
      if (!user) {
        return res.status(400).json({ message: 'Something is wrong!' });
      }
      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, {userId, authors, description, bookId, image, link, title}) => {
        try {
        return await User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { savedBooks: {authors, description, bookId, image, link, title}, } },
          { new: true, runValidators: true }
        );
      } catch (err) {
        console.log(err);
        return res.status(400).json(err);
      }
    },

    removeBook: async (parents, {userId, bookId}) => {
      return await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { savedBooks: { bookId: args.bookId } } },
        { new: true, runValidators: true }
        );
    }
  },
}

module.exports = resolvers;
