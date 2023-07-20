// import { AirlinerTypeDefs } from '../Schema/airlinerSchema.mjs' //! commented 7.6.23 to try .graphql extension
import { airlinerResolvers } from '../Resolvers/airlinerResolver.mjs'
import { createModule } from 'graphql-modules'
import fileDirName from './file-dir-name.mjs'
// import { fileURLToPath } from 'url';
// import { loadFilesSync } from '@graphql-tools/load-files'
// import { mergeTypeDefs } from '@graphql-tools/merge'
import { gql } from 'graphql-tag';
import fs from 'fs';

// import {Airliner, Query, Mutation} from '../Schema/airlinerSchema.gql'
// import * as typeDefs from '../Schema/airlinerSchema.gql'
const typeDefs = fs.readFileSync('../Schema/airlinerSchema.gql', 'utf-8');
const { __dirname, __filename } = fileDirName(import.meta)

export const AirlinerModule = createModule({
  id: 'airliner-module',
  dirname: __dirname,
  filename: __filename,
  // typeDefs: AirlinerTypeDefs,
  // typeDefs: {Airliner, Query, Mutation}, //! commented 7.6.23 to try .graphql extension
  typeDefs,
  resolvers: airlinerResolvers
})

console.log(AirlinerModule)
