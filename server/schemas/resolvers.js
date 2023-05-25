const { User } = require('../models/User');

const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

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

    addUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error('Error in "addUser" mutation:', error);
        throw error;
      }
    },

    addFeeling: async (parent, { FeelingData }, context) => {
      try {
        if (!FeelingData) {
          throw new Error("FeelingData is undefined");
        }
    
        const { emotion, description } = FeelingData;
    
        const newFeeling = {
          emotion,
          description,
          positive: true,
          recommendations: []
        };
    
        console.log(FeelingData);
    
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { feelings: newFeeling } },
          { new: true }
        );
    
        return updatedUser;
      } catch (error) {
        // Handle the error here
        console.error(error);
        throw new Error("An error occurred while adding the feeling.");
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
