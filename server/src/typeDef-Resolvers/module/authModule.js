import { typeDef } from '../authSchema.js'; //!
import { resolvers } from '../authSchema.js'; //!
import { createModule } from 'graphql-modules';
import fileDirName from './file-dir-name.js';

const { __dirname, __filename } = fileDirName(import.meta);

export const AuthModule = createModule({ //!
  id: 'auth-module',  //!
  dirname: __dirname,
  filename: __filename,
  typeDefs: typeDef,
  resolvers: resolvers
});