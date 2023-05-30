import { typeDefs } from '../technicianSchema.js'; //!
import { resolvers } from '../technicianSchema.js'; //!
import { createModule } from 'graphql-modules';
import fileDirName from './file-dir-name.js';

const { __dirname, __filename } = fileDirName(import.meta);

export const TechnicianModule = createModule({ //!
  id: 'technician-module',  //!
  dirname: __dirname,
  filename: __filename,
  typeDefs: typeDefs,
  resolvers: resolvers
});
console.log(TechnicianModule)