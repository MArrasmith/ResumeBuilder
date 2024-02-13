const User = require('../models/User');
const { signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
    Query: {
        users: async () => {
            return User.find()
        },

        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId })
        }
    },

Mutation: {
    addUser: async (parent, { name, email, firstLastName, password }) => {
        const user = await User.create({ name, email, firstLastName, password });
        const token = signToken(user);

        return { token, user };
    },
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });

        if (!user) {
            throw AuthenticationError;
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
            throw AuthenticationError;
        }

        const token = signToken(user);
        return { token, user };
    },
    addResume: async (parent, { userId, resume }, context) => {
        if(context.user) {
            return User.findOneAndUpdate(
                { _id: userId },
                {
                  $push: { resumes: resume },  
                },
                {
                  new: true,
                  runValidators: true,  
                }
            );
        }
        throw AuthenticationError;
    },
    removeResume: async (parent, { userId, resumeId }, context) => {
        if (context.user) {
            return User.findOneAndUpdate(
                { _id: userId },
                { $pull: { resumes: { _id: resumeId } } },
                { new: true }
            );
        }
        throw AuthenticationError;
    },
    removeUser: async (parent, args, context) => {
        if (context.user) {
            return User.findOneAndDelete({ _id: context.user._id });
        }
        throw AuthenticationError;
    }
}
};  

module.exports = resolvers;