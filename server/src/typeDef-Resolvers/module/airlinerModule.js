import{ typeDef } from '../airlinerSchema.js';
import { resolvers } from '../airlinerSchema.js';
import { createModule } from 'graphql-modules';

import fileDirName from './file-dir-name.js';

const { __dirname, __filename } = fileDirName(import.meta);

export const AirlinerModule = createModule({
  id: 'airliner-module',
  dirname: __dirname,
  typeDefs: [typeDef],
  resolvers: [resolvers]
});