const { User, Feeling } = require('../models/User');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      // TODO: Try Catch
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('feelings')
          .populate('emotionHistory');
        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, args) => {
      console.log({ args } );
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    addFeeling: async (parent, args, context) => {
      const { emotion, description } = args;

      const newFeeling = new Feeling({ emotion, description });

      await newFeeling.save();

      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        {
          $push: { feelings: newFeeling._id, emotionHistory: newFeeling._id },
        },

        { new: true }
      )
        .populate('feelings')
        .populate('emotionHistory');

      return newFeeling;
    },

    deleteEmotionHistory: async (parent, args, context) => {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $pull: { emotionHistory: [] } },
        { new: true }
      )
        .populate('feelings')
        .populate('emotionHistory');

      return updatedUser;
    },
  },
};

module.exports = resolvers;
