// import pkg from 'apollo-server';
// const { gql } = pkg;
// import { makeExecutableSchema } from '@graphql-tools/schema'

// export const typeDefs = gql`
// # //TODO need to add a real input type to technician named technicianInput and change auth back to type technician

// input Technician {
//     _id: ID!
//     technicianName: String
//     isAdmin: Boolean
//     # onProject: [Project]
//     username: String!
//     email: String
//     password: String
// }
// ` ;
// // console.log(typeDefs)

// // export const resolvers = {
// export const resolvers = {
//   Technician: {
//     Query:
//     {
//       technicians: async () => {
//         return await Technician.find().sort({ createdAt: -1 })//.cursor(); //added .cursor to see if this resolves //! added await
//       },

//       technician: async (parent, { technicianID }) => {
//         return await Technician.findOne({ _id: technicianID })//.cursor(); //added .cursor to see if this resolves //! added await
//       },
//     },

//     Mutation:
//     {
//       addTechnician: async (
//         parent,
//         { technicianName, isAdmin, onProject, username, email, password }
//       ) => {
//         return Technician.create({
//           technicianName,
//           isAdmin,
//           onProject,
//           username,
//           email,
//           password,
//         });
//       },
//       addProject: async (parent, { technicianID, onProject }) => {
//         return Technician.findOneAndUpdate(
//           { _id: technicianID },
//           {
//             $addToSet: { project: { onProject } },
//           },
//           {
//             new: true,
//             runValidators: true,
//           }
//         );
//       },
//       removeTechnician: async (parent, { technicianID }) => {
//         return Technician.fineOneAndDelete({ _id: technicianID });
//       },
//       removeTechnician: async (parent, { technicianID, onProject }) => {
//         return Technician.destroy({ _id: technicianID }, {});
//       },
//     },
//   }
// };
// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
// });
// const rootResolveFunction = (parent, args, context, info) => {
//   //perform action before any other resolvers
// };
// // addSchemaLevelResolveFunction(schema, rootResolveFunction)
// // module.exports = {typeDef, resolvers}
