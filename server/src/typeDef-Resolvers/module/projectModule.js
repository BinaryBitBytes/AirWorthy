import { typeDefs } from '../projectSchema.js'; //!
import { resolvers } from '../projectSchema.js'; //!
import { createModule } from 'graphql-modules';
import fileDirName from './file-dir-name.js';

const { __dirname, __filename } = fileDirName(import.meta);

export const ProjectModule = createModule({ //!
  id: 'project-module',  //!
  dirname: __dirname,
  filename: __filename,
  typeDefs: typeDefs,
  resolvers: resolvers
});