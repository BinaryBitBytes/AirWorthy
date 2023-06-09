import { airlinerResolvers } from './airlinerResolver.js'
import { resolver as authResolvers } from './authResolver.js'
import { resolver as inspectorResolvers } from './inspectorResolver.js'
import { resolver as managerResolvers } from './managerResolver.js'
import { resolver as projectDataResolvers } from './projectDataResolver.js'
import { resolver as projectResolvers } from './projectResolver.js'
import { resolver as technicianResolvers } from './technicianResolver.js'

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
