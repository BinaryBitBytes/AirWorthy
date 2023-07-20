import { ManagerTypeDefs } from '../Schema/managerSchema.mjs' //!
import { resolver } from '../Resolvers/managerResolver.mjs' //!
import { createModule } from 'graphql-modules'
import fileDirName from './file-dir-name.js'

const { __dirname, __filename } = fileDirName(import.meta)

export const ManagerModule = createModule({ //!
  id: 'manager-module', //!
  dirname: __dirname,
  filename: __filename,
  typeDefs: ManagerTypeDefs,
  resolvers: resolver
})
