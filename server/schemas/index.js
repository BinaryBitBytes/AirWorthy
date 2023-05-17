import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';


import {typeDefs} from './typeDefs.js';
import {resolvers} from './resolvers.js';

export default { typeDefs, resolvers };
