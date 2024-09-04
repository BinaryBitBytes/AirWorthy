import { resolver as airlinerResolvers } from "./airlinerResolver.mjs";
import { resolver as authResolvers } from "./authResolver.mjs";
import { resolver as inspectorResolvers } from "./inspectorResolver.mjs";
import { resolver as managerResolvers } from "./managerResolver.mjs";
import { resolver as projectDataResolvers } from "./projectDataResolver.mjs";
import { resolver as projectResolvers } from "./projectResolver.mjs";
import { resolver as technicianResolvers } from "./technicianResolver.mjs";
import { gql } from "apollo-server";
const resolvers = async () => {
  return await gql[
    ({ ...airlinerResolvers },
    { ...authResolvers },
    { ...inspectorResolvers },
    { ...managerResolvers },
    { ...projectDataResolvers },
    { ...projectResolvers },
    { ...technicianResolvers })
  ];
};
// const translate = gql(resolvers);
// console.log(translate);
console.warn(
  `----------------------------------------------------------------`
);
console.log(resolvers);
export default resolvers;
