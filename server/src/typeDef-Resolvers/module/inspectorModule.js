import { InspectorTypeDefs } from '../Schema/inspectorSchema.js' //!
import { resolver } from '../Resolvers/inspectorResolver.js' //!
import { createModule } from 'graphql-modules'
import fileDirName from './file-dir-name.js'

const { __dirname, __filename } = fileDirName(import.meta)

export const InspectorModule = createModule({ //!
  id: 'inspector-module', //!
  dirname: __dirname,
  filename: __filename,
  typeDefs: InspectorTypeDefs,
  resolvers: resolver
})
