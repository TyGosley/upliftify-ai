const { User } = require('../models/User');
const { Feeling } = require('../models/Feeling');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      try {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
            .populate('feelings')
            .populate('emotionHistory');
          return userData;
        }
        throw new AuthenticationError('Not logged in');
      } catch (error) {
        console.error('Error in "me" query:', error);
        throw error;
      }
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      try {
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
      } catch (error) {
        console.error('Error in "login" mutation:', error);
        throw error;
      }
    },

    addUser: async (parent, {username, email, password}) => {
      try {
        console.log({username, email, password});
        const user = await User.create({username, email, password});
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error('Error in "addUser" mutation:', error);
        throw error;
      }
    },

    addFeeling: async (parent, args, context) => {
      try {
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
      } catch (error) {
        console.error('Error in "addFeeling" mutation:', error);
        throw error;
      }
    },

    deleteEmotionHistory: async (parent, args, context) => {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { emotionHistory: [] } },
          { new: true }
        )
          .populate('feelings')
          .populate('emotionHistory');

        return updatedUser;
      } catch (error) {
        console.error('Error in "deleteEmotionHistory" mutation:', error);
        throw error;
      }
    },
  },
};

module.exports = resolvers;

