// import { AuthTypeDefs } from "../typeDef-Resolvers/authSchema.js";
import { AuthModel } from '../../models/Auth.js'
import authenticationUser from '../../../utils/middleware/auth.js'

export const resolver = {
  Auth: {
    Query: {
      auth: async (parent, args) => {
        return AuthModel.findOne({ _id: args.authID }).populate('auth')
      },
      auths: async (parent, args) => {
        return AuthModel.find().sort({ createdAt: -1 }).populate('auth')
      }
    },
    Mutation: {
      addUser: async (parent, { username, token, email, password, isAdmin }) => {
        const newAuth = new AuthModel({ username, token, email, password, isAdmin })
        await newAuth.build(username, token, email, password)
        await newAuth.save()
        await newAuth.populate('auth')
        return newAuth
      },
      loginUser: async (parent, { username, token, email, password }) => {
        const userLogin = new AuthModel.findOne({ username, token, email, password })
        await userLogin.build(username, email, password)
        await userLogin.save()
        await userLogin.populate('loginUser')
        return userLogin
      }
    }
  }
}

export default resolver
