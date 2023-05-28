import{ typeDef } from '../projectDataSchema.js'; //!
import { resolvers } from '../projectDataSchema.js'; //!
import { createModule } from 'graphql-modules';

import fileDirName from './file-dir-name.js';

const { __dirname, __filename } = fileDirName(import.meta);

export const ProjectDataModule = createModule({ //!
  id: 'projectData-module',  //!
  dirname: __dirname,
  typeDefs: [typeDef],
  resolvers: [resolvers]
});