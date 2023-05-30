import { typeDef } from '../inspectorSchema.js'; //!
import { resolvers } from '../inspectorSchema.js'; //!
import { createModule } from 'graphql-modules';
import fileDirName from './file-dir-name.js';

const { __dirname, __filename } = fileDirName(import.meta);

export const InspectorModule = createModule({ //!
  id: 'inspector-module',  //!
  dirname: __dirname,
  filename: __filename,
  typeDefs: typeDef,
  resolvers: resolvers
});