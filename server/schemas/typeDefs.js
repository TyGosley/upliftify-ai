const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: User
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    feelings: [Feeling]
    emotionHistory: [Feeling]
  }

  type Feeling {
    _id: ID
    emotion: String
    description: String
    recommendations: [String]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addFeeling(emotion: String!, description: String!, recommendations: [String]!): Feeling
    deleteEmotionHistory: User
  }
`;

module.exports = typeDefs;
