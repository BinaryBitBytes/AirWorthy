import{ typeDef } from '../technicianSchema.js'; //!
import { resolvers } from '../technicianSchema.js'; //!
import { createModule } from 'graphql-modules';

import fileDirName from './file-dir-name.js';

const { __dirname, __filename } = fileDirName(import.meta);

export const TechnicianModule = createModule({ //!
  id: 'technician-module',  //!
  dirname: __dirname,
  typeDefs: [typeDef],
  resolvers: [resolvers]
});