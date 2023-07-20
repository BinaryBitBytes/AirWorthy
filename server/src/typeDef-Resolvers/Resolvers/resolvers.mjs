import { airlinerResolvers } from './airlinerResolver.mjs'
import { resolver as authResolvers } from './authResolver.mjs'
import { resolvers as inspectorResolvers } from './inspectorResolver.mjs'
import { resolver as managerResolvers } from './managerResolver.mjs'
import { resolver as projectDataResolvers } from './projectDataResolver.mjs'
import { resolver as projectResolvers } from './projectResolver.mjs'
import { resolver as technicianResolvers } from './technicianResolver.mjs'

const resolvers = {
  ...airlinerResolvers,
  ...authResolvers,
  ...inspectorResolvers,
  ...managerResolvers,
  ...projectDataResolvers,
  ...projectResolvers,
  ...technicianResolvers
}
export default resolvers
console.log(resolvers)
