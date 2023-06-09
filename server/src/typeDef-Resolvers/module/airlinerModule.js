import { AirlinerTypeDefs } from '../Schema/airlinerSchema.js'
import { airlinerResolvers } from '../Resolvers/airlinerResolver.js'
import { createModule } from 'graphql-modules'
import fileDirName from './file-dir-name.js'
// import { fileURLToPath } from 'url';
// import { loadFilesSync } from '@graphql-tools/load-files'
// import { mergeTypeDefs } from '@graphql-tools/merge'

const { __dirname, __filename } = fileDirName(import.meta)

export const AirlinerModule = createModule({
  id: 'airliner-module',
  dirname: __dirname,
  filename: __filename,
  typeDefs: AirlinerTypeDefs,
  resolvers: airlinerResolvers
})
