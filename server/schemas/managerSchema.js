export const typeDef = `
    type Manager {
        _id: ID!
        managerName: String
        isAdmin: Boolean
        onProject: [Project]
        username: String!
        email: String
        password: String
  }
` ;