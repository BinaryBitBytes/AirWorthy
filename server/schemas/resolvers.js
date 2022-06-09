const { mongoose } = require("mongoose");
const { Technician } = require("../models");
const { Manager } = require("../models");
const { Project } = require("../models");
const { Airliner } = require("../models");
const { Inspector } = require("../models");

//Creating Resolvers for Technician
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
    removeTechnician: async (parent, { technicianID, onProject }) => {
      return Technician.findOneAndUpdate({ _id: technicianID }, {});
    },
  },
};

//Creating Resolvers for Manager
const managerResolvers = {
  Query: {
    managers: async () => {
      return Manager.find().sort({ createdAt: -1 });
    },

    manager: async (parent, { managerID }) => {
      return Manager.findOne({ _id: managerID });
    },
  },

  Mutation: {
    addManager: async (
      parent,
      { managerName, isAdmin, onProject, username, email, password }
    ) => {
      return Manager.create({
        managerName,
        isAdmin,
        onProject,
        username,
        email,
        password,
      });
    },
    addProject: async (parent, { managerID, onProject }) => {
      return Manager.findOneAndUpdate(
        { _id: managerID },
        {
          $addToSet: { project: { onProject } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeManager: async (parent, { managerID }) => {
      return Manager.fineOneAndDelete({ _id: managerID });
    },
    removeManager: async (parent, { managerID, onProject }) => {
      return Manager.findOneAndUpdate({ _id: managerID }, {});
    },
  },
};

//! Creating Resolver for Project
const projectResolvers = {
  Query: {
    projects: async () => {
      return Project.find().sort({ createdAt: -1 });
    },

    project: async (parent, { projectID }) => {
      return Project.findOne({ _id: projectID });
    },
  },

  Mutation: {
    addProject: async (
      parent,
      { projectName, isAdmin, onProject, username, email, password }
    ) => {
      return Project.create({
        projectName,
        isAdmin,
        onProject,
        username,
        email,
        password,
      });
    },
    addProject: async (parent, { projectID, onProject }) => {
      return Project.findOneAndUpdate(
        { _id:projectID },
        {
          $addToSet: { project: { onProject } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeProject: async (parent, { projectID }) => {
      return Project.fineOneAndDelete({ _id: projectID });
    },
    removeTechnician: async (parent, { projectId, onProject }) => {
      return Project.findOneAndUpdate({ _id: projectId }, {});
    },
  },
};

//Creating Resolver for Airliner
const airlinerResolvers = {
  Query: {
    airliners: async () => {
      return Airliner.find().sort({ createdAt: -1 });
    },

    airliner: async (parent, { airlinerID }) => {
      return Airliner.findOne({ _id: airlinerID });
    },
  },

  Mutation: {
    addAirliner: async (parent,
      { airlinerName, isAdmin, onProject, username, email, password }
    ) => {
      return Airliner.create({
        airlinerName,
        isAdmin,
        onProject,
        username,
        email,
        password,
      });
    },
    addProject: async (parent, { airlinerID, onProject }) => {
      return Airliner.findOneAndUpdate(
        { _id: airlinerID },
        {
          $addToSet: { project: { onProject } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeTechnician: async (parent, { airlinerID }) => {
      return Airliner.fineOneAndDelete({ _id: airlinerID });
    },
    removeTechnician: async (parent, { airlinerID, onProject }) => {
      return Airliner.findOneAndUpdate({ _id: airlinerID }, {});
    },
  },
};

//Creating Resolver for Inspector
const inspectorResolvers = {
  Query: {
    inspectors: async () => {
      return Technician.find().sort({ createdAt: -1 });
    },

    inspector: async (parent, { inspectorID }) => {
      return Technician.findOne({ _id: inspectorID });
    },
  },

  Mutation: {
    addInspector: async (
      parent,
      { inspectorName, isAdmin, onProject, username, email, password }
    ) => {
      return Inspector.create({
        inspectorName,
        isAdmin,
        onProject,
        username,
        email,
        password,
      });
    },
    addProject: async (parent, { inspectorID, onProject }) => {
      return Inspector.findOneAndUpdate(
        { _id: inspectorID },
        {
          $addToSet: { project: { onProject } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeInspector: async (parent, { inspectorID }) => {
      return Inspector.fineOneAndDelete({ _id: inspectorID });
    },
    removeInspector: async (parent, { inspectorID, onProject }) => {
      return Inspector.findOneAndUpdate({ _id: inspectorID }, {});
    },
  },
};

module.exports = technicianResolvers;
module.exports = managerResolvers;
module.exports = projectResolvers; //! still need to do project
module.exports = inspectorResolvers;
module.exports = airlinerResolvers;

// const { User } = require("../models");
// const { signToken } = require("../utils/auth");
// const { AuthenticationError } = require("apollo-server-express");

// const resolvers = {
//   Query: {
//     me: async (parent, { userId }) => {
//       return await User.findOne({
//         $or: [{ _id: userId }, { username: username }],
//       }).populate("savedBooks");
//     },
//   },

//   Mutation: {
//     loginUser: async (parent, { email, password }) => {
//       const user = await User.findOne({ email });
//       if (!user) {
//         throw new AuthenticationError("Cannot find this user");
//       }

//       const correctPw = await user.isCorrectPassword(password);

//       if (!correctPw) {
//         throw new AuthenticationError("Wrong password!");
//       }
//       const token = signToken(user);
//       return { token, user };
//     },

//     addUser: async (parent, { username, email, password }) => {
//       const user = await User.create({ username, email, password });

//       if (!user) {
//         return res.status(400).json({ message: "Something is wrong!" });
//       }
//       const token = signToken(user);
//       return { token, user };
//     },
//   },
// };

// module.exports = resolvers;
