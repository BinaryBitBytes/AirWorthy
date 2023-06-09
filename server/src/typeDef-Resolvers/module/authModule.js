import { AuthTypeDefs } from '../Schema/authSchema.js' //!
import { resolver } from '../Resolvers/authResolver.js' //!
import { createModule } from 'graphql-modules'
import fileDirName from './file-dir-name.js'

const { __dirname, __filename } = fileDirName(import.meta)

export const AuthModule = createModule({ //!
  id: 'auth-module', //!
  dirname: __dirname,
  filename: __filename,
  typeDefs: AuthTypeDefs,
  resolvers: resolver
})
