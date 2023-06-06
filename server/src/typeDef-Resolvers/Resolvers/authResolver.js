export const resolver = {
  Auth: {
    Query: {
      auth: async (parent, { _id }) => {
        return Auth.findOne({ _id: authID } ).populate("auth");
      },
      auths: async (parent, { username }) => {
        return Auth.find().sort({ createdAt: -1 }).populate("auth"); //! added await
      },
    },
    Mutation: {
      addUser: async (parent, 
        { username, token, email, password, isAdmin }
        ) => {
          const newAuth = new Auth({ username, token, email, password, isAdmin });
          await newAuth.build(username, token, email, password );
          await newAuth.save();
          await newAuth.populate("auth");
          //Todo: Needs return fn <-------
          // return newAuth;
      },
      addUser: async (parent, { authID, username, email, password }) => {
        return authID.findOneAndUpdate( //Todo: need to verify the parent value of userID <------ 
        //! ^^^^
          { _id: authID },
          {
            $addToSet: { username: {username}, email: { email }, password: {password} },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      },
      loginUser: async (parent, { username, token, email, password }) => {
        const userLogin = new Auth.findOne({ username, token, email, password });
        await userLogin.build(username, email, password);
        await userLogin.save();
        await userLogin.populate("loginUser");
      },
      //TODO: updating user
      //TODO: removing User
    },
  },
};
export default resolver;