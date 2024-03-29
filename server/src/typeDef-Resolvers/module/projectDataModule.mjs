import { typeDefs } from '../Schema/projectDataSchema.mjs' //!
import { resolver } from '../Resolvers/projectDataResolver.mjs' //!
import { createModule } from 'graphql-modules'
import fileDirName from './file-dir-name.js'

const { __dirname, __filename } = fileDirName(import.meta)

export const ProjectDataModule = createModule({ //!
  id: 'projectData-module', //!
  dirname: __dirname,
  filename: __filename,
  typeDefs,
  resolvers: resolver
})
