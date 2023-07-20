import { ProjectTypeDefs } from '../Schema/projectSchema.mjs' //!
import { resolver } from '../Resolvers/projectResolver.mjs' //!
import { createModule } from 'graphql-modules'
import fileDirName from './file-dir-name.js'

const { __dirname, __filename } = fileDirName(import.meta)

export const ProjectModule = createModule({ //!
  id: 'project-module', //!
  dirname: __dirname,
  filename: __filename,
  typeDefs: ProjectTypeDefs,
  resolvers: resolver
})
