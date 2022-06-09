const { mongoose } = require("mongoose");
const { Technician } = require("../models");
const { Manager } = require("../models");
const { Project } = require("../models");
const { Airliner } = require("../models");
const { Inspector } = require("../models");

const technicianResolvers = {
  Query: {
    technicians: async () => {
      return Technician.find().sort({ createdAt: -1 });
    },

    technician: async (parent, { technicianID }) => {
      return Technician.findOne({ _id: technicianID });
    },
  },

  Mutation: {
    addTechnician: async (
      parent,
      { technicianName, isAdmin, onProject, username, email, password }
    ) => {
      return Technician.create({
        technicianName,
        isAdmin,
        onProject,
        username,
        email,
        password,
      });
    },
    addProject: async (parent, { technicianID, onProject }) => {
      return Technician.findOneAndUpdate(
        { _id: technicianID },
        {
          $addToSet: { project: { onProject } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeTechnician: async (parent, { technicianID }) => {
      return Technician.fineOneAndDelete({ _id: technicianID });
    },
    removeTechnician: async (parent, { technicianId, onProject }) => {
      return Technician.findOneAndUpdate({ _id: technicianId }, {});
    },
  },
};

module.exports = technicianResolvers;

const { User } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    me: async (parent, { userId }) => {
      return await User.findOne({
        $or: [{ _id: userId }, { username: username }],
      }).populate("savedBooks");
    },
  },

  Mutation: {
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Cannot find this user");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Wrong password!");
      }
      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });

      if (!user) {
        return res.status(400).json({ message: "Something is wrong!" });
      }
      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
