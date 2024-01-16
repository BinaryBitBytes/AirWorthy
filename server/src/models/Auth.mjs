// Resolvers > Models > Schema
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// const Model = () => {
//   return mongoose;
// };
// import { AuthTypeDefs } from "../typeDef-Resolvers/authSchema.js";
class AuthModel {
  constructor() {
    this.schema = new mongoose.Schema(
      {
        id: {
          type: Number,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        token: {
          type: String,
          allowNull: false,
          primaryKey: false,
        },
        userID: [{ type: String }],
        user: String,
        userName: String,
        email: String,
        password: String,
        isAdmin: { type: Boolean, enum: [true] },
      },
      {
        hooks: {
          beforeCreate: async (newUserData) => {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
          },
          beforeUpdate: async (updatedUserData) => {
            updatedUserData.password = await bcrypt.hash(
              updatedUserData.password,
              10
            );
            return updatedUserData;
          }, //? closing: beforeUpdate hook
        }, //? closing: hooks
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "Auth",
      }
    );
    //? End of Schema within the class constructor
    //  (((((((((Start Model()))))))))))
    //? Now need to create model within the class
    this.model = mongoose.model("Auth", this.schema, this.options);
    // ((((((((((End Model()))))))))))
  } //! End of constructor
} //! End of class

//* @Params: METHODS > \\can be defined below: Example: //
//   findUserById(userId) {
//     return this.model.findById(userId);
//   }
// }

console.log(`Type of AuthModel = ` + typeof AuthModel);
console.log(`----------------------------------------------------`);

console.log(`AuthModel @ console.log(AuthModel) = 
${AuthModel}`);

console.log(`-------------------------Before Export-------------------------`);
AuthModel;
export default AuthModel;
console.log(`------------------------After Export---------------------------`);
console.log(AuthModel);

//! @BinaryBitBytes 1.16.24 - original version @ branch: Server.12.15.23
// const Auth = new mongoose.Schema(
//   {
//     id: {
//       type: Number,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     token: {
//       type: String,
//       allowNull: false,
//       primaryKey: false,
//     },
//     userID: [{ type: String }],
//     user: String,
//     userName: String,
//     email: String,
//     password: String,
//     isAdmin: { type: Boolean, enum: [true] },
//   },
//   {
//     hooks: {
//       beforeCreate: async (newUserData) => {
//         newUserData.password = await bcrypt.hash(newUserData.password, 10);
//         return newUserData;
//       },
//       beforeUpdate: async (updatedUserData) => {
//         updatedUserData.password = await bcrypt.hash(
//           updatedUserData.password,
//           10
//         );
//         return updatedUserData;
//       },
//     },
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: "Auth",
//   }
// );
// const AuthModel = model("Auth", Auth);
// export default AuthModel;
